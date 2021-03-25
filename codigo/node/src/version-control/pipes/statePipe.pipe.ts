import { BadRequestException, ParseUUIDPipe } from '@nestjs/common';

export class StatePipe extends ParseUUIDPipe {
  constructor() {
    super({
      exceptionFactory: () => new BadRequestException('Identificador inválido'),
    });
  }
}
