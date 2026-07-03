import {
  IsEnum,
  IsString,
  IsOptional,
  IsInt,
  Min,
  Max,
  IsBoolean,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { CalendarOrderPreset } from '@kartiiing/shared';

export class FindRaceEventsQuery {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(CalendarOrderPreset)
  preset?: CalendarOrderPreset;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  includeStatus?: boolean = true;
}

export class YearParams {
  @IsInt()
  @Min(1950)
  @Max(new Date().getFullYear() + 3)
  @Type(() => Number)
  year!: number;
}
