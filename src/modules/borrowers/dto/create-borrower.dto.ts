import { IsString, IsEmail, Length } from 'class-validator';

export class CreateBorrowerDto {
  @IsString()
  @Length(2, 50)
  name: string;

  @IsEmail()
  email: string;
}
