import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { commonquery } from './commonquery';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, commonquery],
})
export class UserModule {}
