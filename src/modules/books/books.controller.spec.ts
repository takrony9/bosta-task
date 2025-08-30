import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create and return a book', async () => {
      const dto = { title: 'Clean Code', isbn: '9780132350884', authorId: 1, availableQuantity: 5, shelfLocation: 'A1' };
      const expected = { id: 1, ...dto };

      (service.create as jest.Mock).mockResolvedValue(expected);

      const result = await controller.create(dto as any);
      expect(result).toEqual(expected);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return all books', async () => {
      const expected = [{ id: 1, title: 'Book1', isbn: '1234567890', authorId: 1, availableQuantity: 3, shelfLocation: 'A1' }];
      (service.findAll as jest.Mock).mockResolvedValue(expected);

      const result = await controller.findAll();
      expect(result).toEqual(expected);
    });
  });
});
