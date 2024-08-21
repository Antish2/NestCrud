import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./CreateUserdto";

export class UpdateUserDto extends PartialType(CreateUserDto){}