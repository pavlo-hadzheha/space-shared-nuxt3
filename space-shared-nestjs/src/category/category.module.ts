import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Category } from 'src/models/category.model';
import { User } from 'src/models/user.model';
import { UserService } from 'src/user/user.service';
import { CategoriesController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category, User])],
  controllers: [CategoriesController],
  providers: [CategoryService, AuthService, UserService]
})
export class CategoryModule {}
