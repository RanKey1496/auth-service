import { Container } from 'inversify';
import Types from './types';
import { AuthController } from '../controller/authController';
import { RegistrableController } from '../controller/RegistrableController';
import { JwtService, JwtServiceImp } from '../service/jwtService';
import { PassportService, PassportServiceImp } from '../service/passportService';
import { UserRepository } from '../repository/userRepository';

const container: Container = new Container();

// Controllers
container.bind<RegistrableController>(Types.Controller).to(AuthController);

// Services
container.bind<JwtService>(Types.JwtService).to(JwtServiceImp).inSingletonScope();
container.bind<PassportService>(Types.PassportService).to(PassportServiceImp).inSingletonScope();

// Repositories
container.bind<UserRepository>(Types.UserRepository).to(UserRepository).inSingletonScope();

export { container };