import { PartialType } from '@nestjs/swagger';
import { CreateAuthDto } from './CreateAuthDto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
