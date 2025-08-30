import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class BorrowingsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBorrowingDto) {
    const book = await this.prisma.book.findUnique({ where: { id: dto.bookId } });
    if (!book) throw new BadRequestException('Book not found');
    if (book.availableQuantity < 1) throw new BadRequestException('Book not available');

    const borrowing = await this.prisma.borrowing.create({
      data: {
        bookId: dto.bookId,
        borrowerId: dto.borrowerId,
        durationDays: dto.durationDays,
        checkoutDate: new Date(),
      },
    });

    await this.prisma.book.update({
      where: { id: dto.bookId },
      data: { availableQuantity: { decrement: 1 } },
    });

    return borrowing;
  }

  findAll() {
    return this.prisma.borrowing.findMany({ include: { book: true, borrower: true } });
  }

  findOne(id: number) {
    return this.prisma.borrowing.findUnique({ where: { id }, include: { book: true, borrower: true } });
  }

  async returnBook(id: number) {
    const borrowing = await this.prisma.borrowing.findUnique({ where: { id } });
    if (!borrowing) throw new BadRequestException('Borrowing not found');
    if (borrowing.isReturned) throw new BadRequestException('Book already returned');

    await this.prisma.book.update({
      where: { id: borrowing.bookId },
      data: { availableQuantity: { increment: 1 } },
    });

    return this.prisma.borrowing.update({
      where: { id },
      data: { isReturned: true, returnDate: new Date() },
    });
  }

  async findActiveByBorrower(borrowerId: number) {
    return this.prisma.borrowing.findMany({
      where: {
        borrowerId,
        isReturned: false,
      },
      include: { book: true },
    });
  }

  async findOverdue() {
    const now = new Date();
    return this.prisma.borrowing.findMany({
        where: {
            isReturned: false,
            checkoutDate: {
                lt: new Date(now.getTime()),
            },
        },
        include: { book: true, borrower: true },
    }).then(results =>
        results.filter(b => {
            const dueDate = new Date(b.checkoutDate);
            dueDate.setDate(dueDate.getDate() + b.durationDays);
            return dueDate < now;
        }),
    );
  }

  async findOverdueLastMonth() {
    const now = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const borrowings = await this.prisma.borrowing.findMany({
      where: {
        isReturned: false,
        checkoutDate: { gte: lastMonth, lte: now },
      },
      include: { book: true, borrower: true },
    });

    return borrowings.filter(b => {
      const dueDate = new Date(b.checkoutDate);
      dueDate.setDate(dueDate.getDate() + b.durationDays);
      return dueDate < now;
    });
  }

  async findAllLastMonth() {
    const now = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    return this.prisma.borrowing.findMany({
        where: {
            checkoutDate: { gte: lastMonth, lte: now },
        },
        include: { book: true, borrower: true },
    });
  }
}
