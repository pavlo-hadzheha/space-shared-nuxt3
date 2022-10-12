import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.model';
import { MongoRepository, ObjectID } from 'typeorm';
import { UserResponse } from '../auth/dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: MongoRepository<User>
    ) {}

    async getAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getById(id: string): Promise<User> {
        return await this.userRepository.findOneBy({id: id });
    }

    async getByEmail(email: string): Promise<User> {
        return await this.userRepository.findOneBy({email: email});
    }

    async create(user: User): Promise<User> {
        const createUser = await this.userRepository.save(user);

        return createUser;
    }
}
