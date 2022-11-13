import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/models/review.model';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { User } from 'src/models/user.model';
import { CreateReviewDto, ViewReviewDto } from './dto/review.dto';
import { UserService } from 'src/user/user.service';
 
@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review) private readonly reviewRepository: MongoRepository<Review>,
        @Inject(UserService) private userService: UserService,
        @InjectMapper() private readonly classMapper: Mapper,
    ) {}

    async getByUser(user: User): Promise<ViewReviewDto[]> {
        const reviews = this.classMapper.mapArray(await this.reviewRepository.findBy({userId: user.id.toString()}), Review, ViewReviewDto);

        for(let review of reviews) {
            review.userFirstName = user.firstName; 
            review.userLastName = user.lastName;
        }

        return reviews;
    }

    async getBySpaceId(spaceId: string): Promise<ViewReviewDto[]> {
        const reviews = this.classMapper.mapArray(await this.reviewRepository.findBy({spaceId: spaceId}), Review, ViewReviewDto);

        for(let review of reviews) {
            try {
                const user = await this.userService.getById(review.userId);

                review.userFirstName = user.firstName; 
                review.userLastName = user.lastName;
            } catch(err) {
            }
            
        }

        return reviews;
    }

    async create(user: User, spaceId: string, review: CreateReviewDto): Promise<ViewReviewDto> {
        let newReview = this.classMapper.map(await this.reviewRepository.save({_id: null, ...review, userId: user.id.toString(), spaceId: spaceId}), Review, ViewReviewDto);

        newReview.userFirstName = user.firstName; 
        newReview.userLastName = user.lastName;

        return newReview;
    }

    async remove(reviewId: string): Promise<boolean> {
        return await this.reviewRepository.deleteOne({_id: ObjectID(reviewId) }) != null;
    }
}
