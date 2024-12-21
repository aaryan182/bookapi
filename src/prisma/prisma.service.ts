// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // Initialize Prisma Client on module init
  async onModuleInit() {
    await this.$connect();
  }

  // Disconnect Prisma Client on module destroy
  async onModuleDestroy() {
    await this.$disconnect();
  }
}