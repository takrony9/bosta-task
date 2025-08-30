import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateAuthorDto) {
    return this.prisma.author.create({ data: dto });
  }

  findAll() {
    return this.prisma.author.findMany({ include: { books: true } });
  }

  findOne(id: number) {
    return this.prisma.author.findUnique({ where: { id }, include: { books: true } });
  }

  update(id: number, dto: UpdateAuthorDto) {
    return this.prisma.author.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.author.delete({ where: { id } });
  }
}
