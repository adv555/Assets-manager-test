import { REPOSITORY } from 'src/constants';
import { User } from './entities/user.entity';

export const userProvider = {
  provide: REPOSITORY.USER,
  useValue: User,
};
