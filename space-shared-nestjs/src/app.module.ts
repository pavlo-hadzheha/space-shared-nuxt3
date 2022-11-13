import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { FavoriteModule } from './favorite/favorite.module';
import { FeatureModule } from './feature/feature.module';
import { PhotoModule } from './photo/photo.module';
import { SpaceModule } from './space/space.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://spaceshared:spaceshared@spaceshared.cbomnxj.mongodb.net/?retryWrites=true&w=majority',
      database: 'test',
      entities: [
        __dirname + '/**/*.model{.ts,.js}',
      ],
      ssl: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    AuthModule,
    UserModule,
    SpaceModule,
    CategoryModule,
    FeatureModule,
    FavoriteModule,
    PhotoModule,
  ],
})
export class AppModule { }
