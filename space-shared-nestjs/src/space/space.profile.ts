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
import { Space } from '../models/space.model';
import { CreateSpaceDto, EditSpaceDto, ViewSpaceDto } from './dto/space.dto';
import { ObjectID } from 'mongodb';

@Injectable()
export class SpaceProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        CreateSpaceDto,
        Space,
        forMember((dest) => dest._id, ignore()),
        forMember(
          (dest) => dest.images,
          mapFrom((opt) => opt.images),
        ),
        forMember(
          (dest) => dest.features,
          mapFrom((opt) => opt.features),
        ),
      );
      createMap(
        mapper,
        Space,
        EditSpaceDto,
        forMember(
          (dest) => dest.id,
          mapFrom((opt) => opt._id.toString()),
        ),
        forMember(
          (dest) => dest.images,
          mapFrom((opt) => opt.images),
        ),
        forMember(
          (dest) => dest.features,
          mapFrom((opt) => opt.features),
        ),
      );
      createMap(
        mapper,
        Space,
        ViewSpaceDto,
        forMember(
          (dest) => dest.id,
          mapFrom((opt) => opt._id.toString()),
        ),
        forMember(
          (dest) => dest.images,
          mapFrom((opt) => opt.images),
        ),
        forMember(
          (dest) => dest.features,
          mapFrom((opt) => opt.features),
        ),
      );
      createMap(
        mapper,
        EditSpaceDto,
        Space,
        forMember(
          (dest) => dest._id,
          mapFrom((opt) => ObjectID(opt.id)),
        ),
        forMember(
          (dest) => dest.images,
          mapFrom((opt) => opt.images),
        ),
        forMember(
          (dest) => dest.features,
          mapFrom((opt) => opt.features),
        ),
      );
    };
  }
}
