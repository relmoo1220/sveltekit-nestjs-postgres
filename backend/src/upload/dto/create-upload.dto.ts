import { IsString, IsInt, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUploadDto {
  @IsInt()
  @IsNotEmpty()
  postId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  body: string;
}
