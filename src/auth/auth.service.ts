import { Get, Injectable } from '@nestjs/common';
import { get } from 'https';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAuthDto } from './dto/CreateAuthDto';

@Injectable()
export class AuthService {
constructor(private readonly prisma:PrismaService){}

    create(createauthdto: CreateAuthDto) {

        //console.log(createauthdto);
        
        const result = this.prisma.$executeRawUnsafe(
          `INSERT INTO users(name, email, password, role) VALUES 
          ('${createauthdto.name}','${createauthdto.email}','${createauthdto.password}','${createauthdto.role}')`)
        return  result;
    }

    findAll() {
        return this.prisma.$queryRawUnsafe(`select * from users`);
    }

    findOne(id: string) {
    
    console.log(id);
    return this.prisma.$queryRawUnsafe(`select * from users where user_id='${id}'` );
    }


    delete(id: string) {
  
    console.log(id);
    return this.prisma.$queryRawUnsafe(`delete from users where user_id=` + id);
   }


}
