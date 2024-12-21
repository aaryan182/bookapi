import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  // Create a new book
  async create(createBookDto: CreateBookDto) {
    try {
      return await this.prisma.book.create({
        data: createBookDto,
      });
    } catch (error) {
      throw new BadRequestException('Invalid book data provided');
    }
  }

  // Get all books
  async findAll() {
    return this.prisma.book.findMany();
  }

  // Get a single book by id
  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  // Update a book
  async update(id: number, updateBookDto: UpdateBookDto) {
    try {
      return await this.prisma.book.update({
        where: { id },
        data: updateBookDto,
      });
    } catch (error) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  }

  // Delete a book
  async remove(id: number) {
    try {
      return await this.prisma.book.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  }
}
