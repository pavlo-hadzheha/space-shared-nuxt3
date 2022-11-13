import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/models/category.model';
import { Space } from 'src/models/space.model';
import { User } from 'src/models/user.model';
import { UserService } from 'src/user/user.service';
import { SpacesController } from './space.controller';
import { SpaceProfile } from './space.profile';
import { SpaceService } from './space.service';

@Module({
  imports: [TypeOrmModule.forFeature([Space, Category, User])],
  controllers: [SpacesController],
  providers: [SpaceService, AuthService, UserService, SpaceProfile, CategoryService]
})
export class SpaceModule {}
