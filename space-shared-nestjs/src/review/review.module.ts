import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Review } from 'src/models/review.model';
import { User } from 'src/models/user.model';
import { UserService } from 'src/user/user.service';
import { ReviewsController } from './review.controller';
import { ReviewProfile } from './review.profile';
import { ReviewService } from './review.service';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User])],
  controllers: [ReviewsController],
  providers: [ReviewService, AuthService, UserService, ReviewProfile]
})
export class ReviewModule {}
