import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  isNotEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum Role {
  Admin = 'Admin',
  Moderator = 'Moderator',
  User = 'User',
}
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({ description: 'Enter User Name', example: 'demo123' })
  name: string;

  @IsEmail()
  @MaxLength(50)
  @ApiProperty({
    description: 'Enter Email Address',
    example: 'demo123@gmail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({ description: 'Enter Password', example: 'demo123' })
  password: string;

  @IsNotEmpty()
  @ApiProperty({ enum: ['Admin', 'Moderator', 'User'] })
  role: Role;

  //@IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  created_at: Date;

  @IsOptional()
  @ApiProperty()
  updated_at: Date;
}
