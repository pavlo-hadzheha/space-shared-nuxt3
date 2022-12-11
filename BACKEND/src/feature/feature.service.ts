import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feature } from 'src/models/feature.model';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { CreateFeatureDto, EditFeatureDto } from './dto/feature.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

@Injectable()
export class FeatureService {
  constructor(
    @InjectRepository(Feature)
    private readonly featureRepository: MongoRepository<Feature>,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  async getAll(): Promise<EditFeatureDto[]> {
    return this.classMapper.mapArrayAsync(
      await this.featureRepository.find(),
      Feature,
      EditFeatureDto,
    );
  }

  async getById(id: string): Promise<EditFeatureDto> {
    return this.classMapper.mapAsync(
      await this.featureRepository.findOneBy({ _id: ObjectID(id) }),
      Feature,
      EditFeatureDto,
    );
  }

  async create(feature: CreateFeatureDto): Promise<EditFeatureDto> {
    const entity = this.classMapper.map(feature, CreateFeatureDto, Feature);
    return this.classMapper.mapAsync(
      await this.featureRepository.save(entity),
      Feature,
      EditFeatureDto,
    );
  }

  async update(feature: EditFeatureDto): Promise<EditFeatureDto> {
    const entity = this.classMapper.map(feature, EditFeatureDto, Feature);
    return this.classMapper.mapAsync(
      await this.featureRepository.save(entity),
      Feature,
      EditFeatureDto,
    );
  }

  async remove(featureId: string): Promise<boolean> {
    return (
      (await this.featureRepository.deleteOne({ _id: ObjectID(featureId) })) !=
      null
    );
  }
}
