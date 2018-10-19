import { RegistrableController } from './RegistrableController';
import { JwtService } from '../service/jwtService';
import { injectable, inject } from 'inversify';
import { Application, Request, Response } from 'express';
import { dataResponse } from '../utils/responses';
import Types from '../config/types';
import passport from 'passport';

@injectable()
export class AuthController implements RegistrableController {

    @inject(Types.JwtService)
    private jwtService: JwtService;

    public register(app: Application) {
        app.route('/facebook')
            .post(passport.authenticate('facebook-token', { scope: ['email', 'public_profile'], session: false }),
                async (req: Request, res: Response, next: Function) => {
                try {
                    const jwt = await this.jwtService.sign(req.body.email);
                    return dataResponse(res, jwt);
                } catch (error) {
                    return next(error);
                }
            });
    }

}