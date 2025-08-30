import { IsString, IsInt, IsOptional, Min, Length } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @Length(1, 100)
  title: string;

  @IsString()
  @Length(10, 20)
  isbn: string;

  @IsInt()
  authorId: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  availableQuantity?: number;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  shelfLocation?: string;
}
