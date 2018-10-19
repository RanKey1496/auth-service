import { inject } from 'inversify';
import Types from '../config/types';
import passport from 'passport';
import passportFacebookToken from 'passport-facebook-token';
import { CLIENT_ID_FACEBOOK, CLIENT_SECRET_FACEBOOK } from '../utils/secrets';
import { UserRepository } from '../repository/userRepository';
import { User } from '../model/user';
import { injectable } from 'inversify';
import { Unauthorize } from '../utils/exceptions';

export interface PassportService {
    init(): Promise<any>;
}

@injectable()
export class PassportServiceImp implements PassportService {

    @inject(Types.UserRepository)
    private userRepository: UserRepository;

    public async init() {
        const a = await this.facebookStrategy();
        return passport.initialize();
    }

    public async facebookStrategy() {
        const facebook = await passport.use(new passportFacebookToken({
            clientID: CLIENT_ID_FACEBOOK,
            clientSecret: CLIENT_SECRET_FACEBOOK,
            profileFields: ['id', 'email', 'first_name', 'last_name', 'gender']
        }, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
            try {
                const user = await this.userRepository.findOneByEmail(profile._json.email);
                if (!user) {
                    console.log('New user');
                    const newUser: User = new User();
                    newUser.email = profile._json.email;
                    newUser.firstName = profile.name.givenName;
                    newUser.lastName = profile.name.familyName;
                    newUser.gender = profile._json.gender;
                    newUser.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
                    newUser.facebookId = profile.id;
                    done(undefined, await this.userRepository.save(newUser));
                }
                done(undefined, user);
            } catch (error) {
                done(new Unauthorize('Invalid user login'));
            }
        }));

        return facebook;
    }

}