import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from 'src/models/favorite.model';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { EditSpaceDto, ViewSpaceDto } from 'src/space/dto/space.dto';
import { User } from 'src/models/user.model';
import { SpaceService } from 'src/space/space.service';
 
@Injectable()
export class FavoriteService {
    constructor(
        @InjectRepository(Favorite) private readonly favoriteRepository: MongoRepository<Favorite>,
        @Inject(SpaceService) private spaceService: SpaceService,
    ) {}

    async getAll(userId: string): Promise<ViewSpaceDto[]> {
        const favorites = await this.favoriteRepository.findBy({userId});

        let spaces: ViewSpaceDto[] = [];

        for(const favorite of favorites) {
            try {
                spaces.push(await this.spaceService.getById(favorite.spaceId));
            } catch(err) {
            }
        }

        return spaces;
    }

    async check(userId: string, spaceId: string): Promise<boolean> {
        const favorites = await this.favoriteRepository.findBy({userId, spaceId});

        return favorites.length > 0;
    }

    async create(userId: string, spaceId: string): Promise<boolean> {
        const favorites = await this.favoriteRepository.findBy({userId, spaceId});

        if(favorites.length == 0) {
            const like:Favorite = {_id: null, userId: userId, spaceId: spaceId};
       
            await this.favoriteRepository.save(like);

            return like != null;
        } else {
            return true;
        }
    }

    async remove(userId: string, spaceId: string): Promise<boolean> {
        return await this.favoriteRepository.deleteOne({userId: userId, spaceId: spaceId}) != null;
    }
}
