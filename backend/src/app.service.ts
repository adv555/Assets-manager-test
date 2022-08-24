import { Injectable } from '@nestjs/common';
import { sum } from './shared/sum';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! 2+4=' + sum(2, 4);
  }
}
