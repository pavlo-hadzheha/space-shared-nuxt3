import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, forMember, ignore, mapFrom, Mapper, MappingProfile } from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { Review } from "../models/review.model";
import { ViewReviewDto } from './dto/review.dto';
import { ObjectID } from 'mongodb';

@Injectable()
export class ReviewProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Review, ViewReviewDto, forMember(dest => dest.id, mapFrom(opt => opt._id.toString())), forMember(dest => dest.userFirstName, ignore()), forMember(dest => dest.userLastName, ignore()));
    };
  }
}