import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RaceEventsModule } from './race-events/race-events.module';
import { dataSource } from './data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(dataSource.options),
    RaceEventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
