import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Patch, Res } from '@nestjs/common';
import type { Response } from 'express';
import { BorrowingsService } from './borrowings.service';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';
import * as fastcsv from 'fast-csv';

@Controller('borrowings')
export class BorrowingsController {
  constructor(private readonly borrowingsService: BorrowingsService) {}

  @Post()
  create(@Body() dto: CreateBorrowingDto) {
    return this.borrowingsService.create(dto);
  }

  @Get()
  findAll() {
    return this.borrowingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.borrowingsService.findOne(id);
  }

  @Patch(':id/return')
  returnBook(@Param('id', ParseIntPipe) id: number) {
    return this.borrowingsService.returnBook(id);
  }

  @Get('/borrower/:borrowerId/active')
  findActiveByBorrower(@Param('borrowerId', ParseIntPipe) borrowerId: number) {
    return this.borrowingsService.findActiveByBorrower(borrowerId);
  }

  @Get('/overdue')
  findOverdue() {
    return this.borrowingsService.findOverdue();
  }

    @Get('overdue/export-csv')
  async exportOverdueCsv(@Res() res: Response) {
    const data = await this.borrowingsService.findOverdueLastMonth();

    const rows = data.map(b => ({
      BorrowingID: b.id,
      Borrower: b.borrower.name,
      Email: b.borrower.email,
      Book: b.book.title,
      ISBN: b.book.isbn,
      CheckoutDate: b.checkoutDate.toISOString().split('T')[0],
      DurationDays: b.durationDays,
      DueDate: new Date(
        new Date(b.checkoutDate).setDate(
          new Date(b.checkoutDate).getDate() + b.durationDays,
        ),
      ).toISOString().split('T')[0],
    }));

    res.setHeader('Content-Disposition', 'attachment; filename=overdue_last_month.csv');
    res.setHeader('Content-Type', 'text/csv');

    fastcsv.write(rows, { headers: true }).pipe(res);
  }

  @Get('export-csv/last-month')
  async exportAllLastMonth(@Res() res: Response) {
    const data = await this.borrowingsService.findAllLastMonth();

    const rows = data.map(b => ({
      BorrowingID: b.id,
      Borrower: b.borrower.name,
      Email: b.borrower.email,
      Book: b.book.title,
      ISBN: b.book.isbn,
      CheckoutDate: b.checkoutDate.toISOString().split('T')[0],
      DurationDays: b.durationDays,
      DueDate: new Date(
        new Date(b.checkoutDate).setDate(
          new Date(b.checkoutDate).getDate() + b.durationDays,
        ),
      ).toISOString().split('T')[0],
      Returned: b.isReturned ? 'Yes' : 'No',
      ReturnDate: b.returnDate ? b.returnDate.toISOString().split('T')[0] : '',
    }));

    res.setHeader('Content-Disposition', 'attachment; filename=borrowings_last_month.csv');
    res.setHeader('Content-Type', 'text/csv');

    fastcsv.write(rows, { headers: true }).pipe(res);
  }
}
