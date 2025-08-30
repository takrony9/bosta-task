import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './database/prisma/prisma.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { BooksModule } from './modules/books/books.module';
import { BorrowersModule } from './modules/borrowers/borrowers.module';
import { BorrowingsModule } from './modules/borrowing/borrowings.module';
import { ThrottlerModule } from '@nestjs/throttler';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthorsModule,
    BooksModule,
    BorrowersModule,
    BorrowingsModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60,       
        limit: 10,    
      },
    ]),
  ],
  providers: [AppService],
})
export class AppModule { }
