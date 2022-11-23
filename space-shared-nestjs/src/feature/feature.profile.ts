import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  ignore,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Feature } from '../models/feature.model';
import { CreateFeatureDto, EditFeatureDto } from './dto/feature.dto';
import { ObjectID } from 'mongodb';

@Injectable()
export class FeatureProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        CreateFeatureDto,
        Feature,
        forMember((dest) => dest._id, ignore()),
      );
      createMap(
        mapper,
        Feature,
        EditFeatureDto,
        forMember(
          (dest) => dest.id,
          mapFrom((opt) => opt._id.toString()),
        ),
      );
      createMap(
        mapper,
        EditFeatureDto,
        Feature,
        forMember(
          (dest) => dest._id,
          mapFrom((opt) => ObjectID(opt.id)),
        ),
      );
    };
  }
}
