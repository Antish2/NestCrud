import { ApiProperty } from '@nestjs/swagger';

export enum Role {
  Admin ='Admin',
  Moderator ='Moderator',
  User ='User'
}
export class user {

  
  @ApiProperty({description: 'Enter User Name'})
  name: string;

  
  @ApiProperty({description: 'Enter Email Address'})
  email: string;

 
  @ApiProperty({description: 'Enter Password'})
  password: string;


  @ApiProperty({ enum: ['Admin', 'Moderator', 'User']})
  role: Role;
  

  @ApiProperty()
   created_at:Date;

 
   @ApiProperty()
   updated_at:Date;
}
