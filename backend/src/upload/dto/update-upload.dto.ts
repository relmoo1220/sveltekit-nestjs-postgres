import { PartialType } from '@nestjs/mapped-types';
import { CreateUploadDto } from './create-upload.dto';
import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUploadDto extends PartialType(CreateUploadDto) {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  postId?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  body?: string;
}
