import { Sequelize } from 'sequelize-typescript';
import { User } from './user/entities/user.entity';

console.log(process.env.DB_HOST);
export const databaseProvider = {
  provide: 'SEQUELIZE',
  useFactory: async () => {
    const sequelize = new Sequelize({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    });
    sequelize.addModels([User]);
    await sequelize.sync();
    return sequelize;
  },
};
