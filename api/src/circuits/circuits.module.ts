import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CircuitsController } from './circuits.controller';
import { CircuitsService } from './circuits.service';
import { CircuitsPersistence } from './circuits.persistence';
import { Circuit } from '../entities/circuit.entity';
import { FastestLap } from '../entities/fastestLap.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Circuit, FastestLap])],
  controllers: [CircuitsController],
  providers: [CircuitsService, CircuitsPersistence],
  exports: [CircuitsService, CircuitsPersistence],
})
export class CircuitsModule {}
