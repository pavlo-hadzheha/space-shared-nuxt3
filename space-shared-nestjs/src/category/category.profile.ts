import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, forMember, ignore, mapFrom, Mapper, MappingProfile } from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { Category } from "../models/category.model";
import { CreateCategoryDto, EditCategoryDto } from './dto/category.dto';
import { ObjectID } from 'mongodb';

@Injectable()
export class CategoryProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, CreateCategoryDto, Category, forMember((dest) => dest._id, ignore()));
      createMap(mapper, Category, EditCategoryDto, forMember(dest => dest.id, mapFrom(opt => opt._id.toString())));
      createMap(mapper, EditCategoryDto, Category, forMember(dest => dest._id, mapFrom(opt => ObjectID(opt.id))));
    };
  }
}