import { Injectable } from '@nestjs/common';
//import { PrismaClient, users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/CreateUserdto';
import { users } from '@prisma/client';
import { user } from './dto/user';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { join } from 'path';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Injectable()
export class UserService {
constructor(private prisma:PrismaService){}

// create(createuserdto: CreateUserDto) {

//     //console.log(createauthdto);
    
//     const result = this.prisma.$executeRawUnsafe(
//       `INSERT INTO users(name, email, password, role) VALUES 
//       ('${createuserdto.name}','${createuserdto.email}','${createuserdto.password}','${createuserdto.role}')`)
//     return  result;
// }
async create(createuserdto:CreateUserDto): Promise<user> {

    const query =`INSERT INTO users(name, email, password, role) VALUES 
        ('${createuserdto.name}','${createuserdto.email}','${createuserdto.password}','${createuserdto.role}') RETURNING *;`
    
        const result = await this.prisma.$queryRawUnsafe<user>(query);
        
        return result;
  }

  async update(id:string,updateuserdto:UpdateUserDto) 
  {
   // console.log(id);
    // console.log(Object.keys(updateuserdto).forEach(function(key) 
    // {
    //     console.log('Key : ' + key + ', Value : ' + updateuserdto[key])
    // })
    // );

    // for (var key in updateuserdto) {
    //     if (updateuserdto.hasOwnProperty(key)) {
    //       var val = updateuserdto[key];
    //       console.log(val);
    //     }
    //   }
      // Object.keys(updateuserdto).forEach(function(key){
    //     if(updateuserdto[key] != null ||  updateuserdto[key] !='undefined')
    //         str += join(`${key} ='${updateuserdto[key] }',`)
    // });
    let qryParam:string=``;
    let strParam :string =``;
    //console.log(updateuserdto);
    for (let key in updateuserdto) 
    {
        if(updateuserdto[key] != null ||  updateuserdto[key] !='undefined')
           strParam += join(`${key} ='${updateuserdto[key] }',`)   
    }
   // console.log(strParam.substring(0, strParam.length - 1));

    qryParam =`update users set ${strParam.substring(0, strParam.length - 1)} where user_id='${id}' RETURNING *`;

    //console.log(qryParam);

    const result = await this.prisma.$queryRawUnsafe(qryParam);
    console.log(result);
    return result;
  }
async findAll() {
    console.log(await this.prisma.$queryRawUnsafe(`select * from users`));
    return await this.prisma.$queryRawUnsafe(`select * from users`);
}

async findOne(id: string) : Promise<user>{

//console.log(id);
return await this.prisma.$queryRawUnsafe(`select * from users where user_id='${id}'` );
}


delete(id: string) {

console.log(id);
return this.prisma.$queryRawUnsafe(`delete from users where user_id=` + id);
}
}
