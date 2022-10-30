import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Space } from 'src/models/space.model';
import { User } from 'src/models/user.model';
import { UserService } from 'src/user/user.service';
import { SpacesController } from './space.controller';
import { SpaceService } from './space.service';

@Module({
  imports: [TypeOrmModule.forFeature([Space, User])],
  controllers: [SpacesController],
  providers: [SpaceService, AuthService, UserService]
})
export class SpaceModule {}
