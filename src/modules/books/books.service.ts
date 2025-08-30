import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateBookDto) {
    return this.prisma.book.create({ data: dto });
  }

  findAll() {
    return this.prisma.book.findMany({ include: { author: true, borrowings: true } });
  }

  findOne(id: number) {
    return this.prisma.book.findUnique({
      where: { id },
      include: { author: true, borrowings: true },
    });
  }

  update(id: number, dto: UpdateBookDto) {
    return this.prisma.book.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.book.delete({ where: { id } });
  }

    search(query: string) {
    return this.prisma.book.findMany({
      where: {
        OR: [
          { title: { contains: query.toLowerCase() } },
          { isbn: { contains: query.toLowerCase() } },
          { author: { name: { contains: query.toLowerCase() } } },
        ],
      },
      include: { author: true },
    });
  }
}
