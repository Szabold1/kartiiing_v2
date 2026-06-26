import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FindCircuitsQuery {
  @IsOptional()
  @IsString()
  search?: string;

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
