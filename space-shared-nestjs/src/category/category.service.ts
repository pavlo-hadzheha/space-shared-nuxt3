import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/models/category.model';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
 
@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category) private readonly categoryRepository: MongoRepository<Category>
    ) {}

    async getAll(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async getById(id: string): Promise<Category> {
        return await this.categoryRepository.findOneBy({_id: ObjectID(id) });
    }

    async create(category: Category): Promise<Category> {
        return await this.categoryRepository.save(category);
    }

    async update(category: Category): Promise<Category> {
        return await this.categoryRepository.save(category);
    }

    async remove(categoryId: string): Promise<boolean> {
        return await this.categoryRepository.deleteOne({_id: ObjectID(categoryId) }) != null;
    }
}
