import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PostgresError } from 'pg-error-enum';

export function postgresCatch(e) {
  const { code, message, detail } = e;
  if (code.toString() === PostgresError.NOT_NULL_VIOLATION)
    throw new BadRequestException(message);
  if (code.toString() === PostgresError.UNIQUE_VIOLATION)
    throw new ConflictException(detail, message);
  else throw new InternalServerErrorException(detail, message);
}
