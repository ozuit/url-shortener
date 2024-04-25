import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './url/url.entity';
import { UrlModule } from './url/url.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'DB.sqlite',
      entities: [Url],
      synchronize: true,
    }),
    UrlModule,
  ],
})
export class AppModule {}
