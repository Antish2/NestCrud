import { ApiProperty } from '@nestjs/swagger';
import {IsEmail,isNotEmpty,IsNotEmpty, IsOptional, IsString,MaxLength,MinLength} from 'class-validator';

export enum Role {
  Admin ='Admin',
  Moderator ='Moderator',
  User ='User'
}
export class CreateAuthDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({description: 'Enter User Name'})
  name: string;

  @IsEmail()
  @MaxLength(50)
  @ApiProperty({description: 'Enter Email Address'})
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({description: 'Enter Password'})
  password: string;

  @IsNotEmpty()
  @ApiProperty({ enum: ['Admin', 'Moderator', 'User']})
  role: Role;
  
  //@IsNotEmpty()
  @IsOptional()
  @ApiProperty()
   createdAt:Date;

   @IsOptional()
   @ApiProperty()
   updatedAt:Date;
}
