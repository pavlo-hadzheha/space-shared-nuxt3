import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/models/category.model';
import { Favorite } from 'src/models/favorite.model';
import { Space } from 'src/models/space.model';
import { User } from 'src/models/user.model';
import { SpaceService } from 'src/space/space.service';
import { UserService } from 'src/user/user.service';
import { FavoritesController } from './favorite.controller';
import { FavoriteService } from './favorite.service';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, User, Space, Category])],
  controllers: [FavoritesController],
  providers: [FavoriteService, AuthService, UserService, SpaceService, CategoryService]
})
export class FavoriteModule {}
