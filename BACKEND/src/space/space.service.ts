import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Space } from 'src/models/space.model';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { CreateSpaceDto, EditSpaceDto, ViewSpaceDto } from './dto/space.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { User } from 'src/models/user.model';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class SpaceService {
  constructor(
    @InjectRepository(Space)
    private readonly spaceRepository: MongoRepository<Space>,
    @Inject(CategoryService) private categoryService: CategoryService,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  async getAll(): Promise<ViewSpaceDto[]> {
    return this.classMapper.mapArrayAsync(
      await this.spaceRepository.find(),
      Space,
      ViewSpaceDto,
    );

    // for (const space of spaces) {
    //     space.category = await this.categoryService.getById(space.categoryId);
    // }
  }

  async getById(id: string): Promise<ViewSpaceDto> {
    return this.classMapper.mapAsync(
      await this.spaceRepository.findOneBy({ _id: ObjectID(id) }),
      Space,
      ViewSpaceDto,
    );

    //space.category = await this.categoryService.getById(space.categoryId);
  }

  async create(space: CreateSpaceDto, user: User): Promise<EditSpaceDto> {
    const entity = this.classMapper.map(space, CreateSpaceDto, Space);

    entity.created_by = user.id.toString();
    entity.approved = false;
    entity.approved_by_admin = false;

    return this.classMapper.mapAsync(
      await this.spaceRepository.save(entity),
      Space,
      EditSpaceDto,
    );
  }

  async update(space: EditSpaceDto): Promise<EditSpaceDto> {
    const entity = this.classMapper.map(space, EditSpaceDto, Space);
    return this.classMapper.mapAsync(
      await this.spaceRepository.save(entity),
      Space,
      EditSpaceDto,
    );
  }

  async remove(spaceId: string): Promise<boolean> {
    return (
      (await this.spaceRepository.deleteOne({ _id: ObjectID(spaceId) })) != null
    );
  }
}
