import { Get, Injectable, UnauthorizedException } from '@nestjs/common';
import { get } from 'https';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAuthDto } from './dto/CreateAuthDto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { user } from 'src/user/dto/user';
import * as bcrypt from 'bcrypt';
import { use } from 'passport';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private user: UserService,
    private jwtservice: JwtService,
  ) {}

  async validateUser(username:string,password:string) :Promise<user>
    { console.log('validate1');
      const user = await this.user.findOneUser(username);
      console.log('validate');
      console.log(user);


      if (user && bcrypt.compareSync(password, user.password)) 
        {
           const result = user;
           return result;
        }
        return null;
  }

  async login(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    console.log(username);
    console.log(pass);

    // const xres= this.validateUser(username,pass);
    // console.log(xres);
    const xuser = await this.user.findOneUser(username);
    // console.log(user);
    // if (user?.password !== pass) {
    //   throw new UnauthorizedException();
    // }
    const payload = { sub: xuser.name, username: xuser.name };

    return {
      access_token: await this.jwtservice.signAsync(payload),
    };
  }
}
