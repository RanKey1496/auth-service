import 'reflect-metadata';
import express, { Application, Request, Response, NextFunction } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import errorHandler from 'errorhandler';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import { RegistrableController } from './controller/RegistrableController';
import { container } from './config/inversify';
import Types from './config/types';
import { notFoundResponse, badRequestResponse, unauthorizeResponse, conflictResponse, internalResponse } from './utils/responses';
import { NotFound, BadRequest, Unauthorize, Conflict } from './utils/exceptions';
import { logger } from './utils/logger';
import { PassportService } from './service/passportService';
import { createConnection } from 'typeorm';
import { dbOptions } from './config/db';

export default class App {

    public async init() {

        await createConnection(dbOptions);

        const app: Application = express();
        app.set('port', process.env.PORT || 3000);
        app.use(errorHandler());
        app.use(compression());
        app.use(helmet());
        app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        const controllers: RegistrableController[] = container.getAll<RegistrableController>(Types.Controller);
        controllers.forEach(controller => controller.register(app));
        const passport: PassportService = container.get<PassportService>(Types.PassportService);
        app.use(await passport.init());

        app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            console.error(err);
            if (err instanceof NotFound) {
                return notFoundResponse(res, err.message);
            }
            if (err instanceof BadRequest) {
                return badRequestResponse(res, err.message);
            }
            if (err instanceof Unauthorize) {
                return unauthorizeResponse(res, err.message);
            }
            if (err instanceof Conflict) {
                return conflictResponse(res, err.message);
            }
            return internalResponse(res);
        });

        return Promise.resolve(app);
    }

    public async start() {
        const app = await this.init();
        const server = app.listen(app.get('port'), async () => {
            console.log(`Service running at port ${app.get('port')} in ${app.get('env')} mode`);
            console.log(`Date: `, new Date());
        });
    }

}