import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Space } from 'src/models/space.model';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
 
@Injectable()
export class SpaceService {
    constructor(
        @InjectRepository(Space) private readonly spaceRepository: MongoRepository<Space>
    ) {}

    async getAll(): Promise<Space[]> {
        return await this.spaceRepository.find();
    }

    async getById(id: string): Promise<Space> {
        return await this.spaceRepository.findOneBy({_id: ObjectID(id) });
    }

    async create(space: Space): Promise<Space> {
        return await this.spaceRepository.save(space);
    }

    async update(space: Space): Promise<Space> {
        return await this.spaceRepository.save(space);
    }

    async remove(spaceId: string): Promise<boolean> {
        return await this.spaceRepository.deleteOne({_id: ObjectID(spaceId) }) != null;
    }
}
