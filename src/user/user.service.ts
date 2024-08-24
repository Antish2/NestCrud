import { Injectable } from '@nestjs/common';
//import { PrismaClient, users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/CreateUserdto';
import { users } from '@prisma/client';
import { user } from './dto/user';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { join } from 'path';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { commonquery } from './commonquery';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private qry: commonquery,
  ) {}

  async create(createuserdto: CreateUserDto): Promise<user> {
    let query = this.qry.insert(createuserdto);

    const result = await this.prisma.$queryRawUnsafe<user>(query);

    return result;
  }

  async update(id: string, updateuserdto: UpdateUserDto) {
    let qryParam: string = this.qry.update(updateuserdto, id);
    const result = await this.prisma.$queryRawUnsafe(qryParam);
    console.log(result);
    return result;
  }
  async findAll() {
    console.log(await this.prisma.$queryRawUnsafe(`select * from users`));
    return await this.prisma.$queryRawUnsafe(`select * from users`);
  }

  async findOne(id: string): Promise<user> {
    let qry: string = this.qry.select(id);
    return await this.prisma.$queryRawUnsafe(qry);
  }

  async findOneUser(name: string): Promise<user> {
    let qry: string = this.qry.selectName(name);
    return await this.prisma.$queryRawUnsafe(qry);
  }

  async delete(id: string) {
    console.log(id);
    return this.prisma.$queryRawUnsafe(`delete from users where user_id=` + id);
  }
}
