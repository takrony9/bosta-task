import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { PrismaService } from 'src/database/prisma/prisma.service';

describe('BooksService', () => {
  let service: BooksService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService, PrismaService],
    }).compile();

    service = module.get<BooksService>(BooksService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new book', async () => {
      const dto = {
        title: 'Clean Code',
        isbn: '9780132350884',
        authorId: 1,
        availableQuantity: 5,
        shelfLocation: 'A1',
      };

jest.spyOn(prisma.book, 'create').mockResolvedValue({
  id: 1,
  ...dto,
  createdAt: new Date(), 
  shelfLocation: dto.shelfLocation ?? null,
});

      const result = await service.create(dto);
      expect(result).toEqual({ id: 1, ...dto });
      expect(prisma.book.create).toHaveBeenCalledWith({ data: dto });
    });
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
    const books = [
    {
        id: 1,
        title: 'Test',
        isbn: '1234567890',
        authorId: 1,
        availableQuantity: 1,
        shelfLocation: 'A1',
        createdAt: new Date(), // 👈 required
    },];

    jest.spyOn(prisma.book, 'findMany').mockResolvedValue(books);

    const result = await service.findAll();
      expect(result).toEqual(books);
    });
  });
}); 
