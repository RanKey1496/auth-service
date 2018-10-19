import jwt from 'jsonwebtoken';
import { injectable } from 'inversify';
import { SECRET } from '../utils/secrets';
import { SECRET_REFRESH } from '../utils/secrets';

export interface JwtService {
    sign(payload: string): any;
    verifyToken(token: string): boolean;
    verifyRefresh(token: string): boolean;
}

@injectable()
export class JwtServiceImp implements JwtService {

    public sign(payload: string): any {
        const token = jwt.sign({ data: payload }, SECRET, { expiresIn: '10d' });
        const refreshToken = jwt.sign({ data: payload }, SECRET_REFRESH, { expiresIn: '30d' });
        return { token, refreshToken };
    }

    public verifyToken(token: string): boolean {
        return !!this.verify(token, SECRET);
    }

    public verifyRefresh(token: string): boolean {
        return !!this.verify(token, SECRET_REFRESH);
    }

    private verify(token: string, secret: string): any {
        return jwt.verify(token, secret);
    }

}