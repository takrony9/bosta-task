import { IsInt, Min } from 'class-validator';

export class CreateBorrowingDto {
  @IsInt()
  bookId: number;

  @IsInt()
  borrowerId: number;

  @IsInt()
  @Min(1)
  durationDays: number;
}
