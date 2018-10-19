import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { GenericRepositoryImp } from './repository';
import { getRepository } from 'typeorm';
import { User } from '../model/user';

@injectable()
export class UserRepository extends GenericRepositoryImp<User> {

    private userRepository: Repository<User>;

    constructor() {
        const repository = getRepository(User);
        super(repository);
        this.userRepository = repository;
    }

    public async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({ email });
    }

    public async findByFacebookId(facebookId: string): Promise<User> {
        return await this.userRepository.findOne({ facebookId });
    }

}