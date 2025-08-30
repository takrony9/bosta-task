import { Injectable } from '@nestjs/common';
import { CreateBorrowerDto } from './dto/create-borrower.dto';
import { UpdateBorrowerDto } from './dto/update-borrower.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class BorrowersService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateBorrowerDto) {
    return this.prisma.borrower.create({ data: dto });
  }

  findAll() {
    return this.prisma.borrower.findMany({ include: { borrowings: true } });
  }

  findOne(id: number) {
    return this.prisma.borrower.findUnique({ where: { id }, include: { borrowings: true } });
  }

  update(id: number, dto: UpdateBorrowerDto) {
    return this.prisma.borrower.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.borrower.delete({ where: { id } });
  }
}
