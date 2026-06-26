import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RaceEventsModule } from './race-events/race-events.module';
import { CircuitsModule } from './circuits/circuits.module';
import { dataSource } from './data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(dataSource.options),
    RaceEventsModule,
    CircuitsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
