import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/models/category.model';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { CreateCategoryDto, EditCategoryDto } from './dto/category.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: MongoRepository<Category>,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  async getAll(): Promise<EditCategoryDto[]> {
    return this.classMapper.mapArrayAsync(
      await this.categoryRepository.find(),
      Category,
      EditCategoryDto,
    );
  }

  async getById(id: string): Promise<EditCategoryDto> {
    return this.classMapper.mapAsync(
      await this.categoryRepository.findOneBy({ _id: ObjectID(id) }),
      Category,
      EditCategoryDto,
    );
  }

  async create(category: CreateCategoryDto): Promise<EditCategoryDto> {
    const entity = this.classMapper.map(category, CreateCategoryDto, Category);
    return this.classMapper.mapAsync(
      await this.categoryRepository.save(entity),
      Category,
      EditCategoryDto,
    );
  }

  async update(category: EditCategoryDto): Promise<EditCategoryDto> {
    const entity = this.classMapper.map(category, EditCategoryDto, Category);
    return this.classMapper.mapAsync(
      await this.categoryRepository.save(entity),
      Category,
      EditCategoryDto,
    );
  }

  async remove(categoryId: string): Promise<boolean> {
    return (
      (await this.categoryRepository.deleteOne({
        _id: ObjectID(categoryId),
      })) != null
    );
  }
}
