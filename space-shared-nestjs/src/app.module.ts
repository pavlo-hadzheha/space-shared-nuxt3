import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PhotoModule } from './photo/photo.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://spaceshared:spaceshared@spaceshared.cbomnxj.mongodb.net/?retryWrites=true&w=majority', 
      database: 'test',
      entities: [
        __dirname + '/**/*.model{.ts,.js}',
      ],
      ssl: true,
      useUnifiedTopology: true,
      useNewUrlParser: true
    }),
    AuthModule,
    UserModule,
    PhotoModule,
  ],
})
export class AppModule {}
