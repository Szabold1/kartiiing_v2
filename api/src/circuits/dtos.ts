import {
  IsOptional,
  IsString,
  IsInt,
  Min,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CircuitsOrderPreset } from '@kartiiing/shared';

export class FindCircuitsQuery {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(CircuitsOrderPreset)
  preset?: CircuitsOrderPreset;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  userLatitude?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  userLongitude?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number;
}

export class FindCoordinatesQuery {
  @IsOptional()
  @IsString()
  search?: string;
}

export class CircuitIdParams {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  id!: number;
}
