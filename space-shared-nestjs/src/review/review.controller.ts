import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/currentUserDecorator';
import { AuthGuard } from 'src/guards/AuthGuard';
import { User } from 'src/models/user.model';
import { ViewSpaceDto } from 'src/space/dto/space.dto';
import { CreateReviewDto, ViewReviewDto } from './dto/review.dto';
import { ReviewService } from './review.service';

@ApiBearerAuth()
@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(@Inject(ReviewService) private reviewService: ReviewService) {}

  @ApiOkResponse({ type: [ViewReviewDto] })
  @UseGuards(AuthGuard)
  @Get('/my_reviews')
  checkReviewBySpaceId(@CurrentUser() user: User): Promise<ViewReviewDto[]> {
    return this.reviewService.getByUser(user);
  }

  @ApiOkResponse({ type: [ViewSpaceDto] })
  @Get('/:spaceId')
  getAllReviews(@Param('spaceId') spaceId: string): Promise<ViewReviewDto[]> {
    return this.reviewService.getBySpaceId(spaceId);
  }

  @ApiCreatedResponse({ type: Boolean })
  @UseGuards(AuthGuard)
  @Post('/:spaceId')
  createReview(
    @CurrentUser() user: User,
    @Param('spaceId') spaceId: string,
    @Body() review: CreateReviewDto,
  ): Promise<ViewReviewDto> {
    return this.reviewService.create(user, spaceId, review);
  }

  @ApiOkResponse({ type: Boolean })
  @UseGuards(AuthGuard)
  @Delete('/:reviewId')
  removeReview(@Param('reviewId') reviewId: string): Promise<boolean> {
    return this.reviewService.remove(reviewId);
  }
}
