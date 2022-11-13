import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Feature } from 'src/models/feature.model';
import { User } from 'src/models/user.model';
import { UserService } from 'src/user/user.service';
import { FeaturesController } from './feature.controller';
import { FeatureProfile } from './feature.profile';
import { FeatureService } from './feature.service';

@Module({
  imports: [TypeOrmModule.forFeature([Feature, User])],
  controllers: [FeaturesController],
  providers: [FeatureService, AuthService, UserService, FeatureProfile]
})
export class FeatureModule {}
