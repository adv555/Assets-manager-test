# Structure

The backend is using NestJS framework, so please make sure you've read at least:

-   [NestJS introduction](https://docs.nestjs.com).
-   [NestJS overview](https://docs.nestjs.com/first-steps)

[Sequelize with NestJS](https://docs.nestjs.com/recipes/sql-sequelize)

```
config/                         sequelize config
seeders/                        seeders
src/
    shared/                     symlink to shared in the repository root
    xxxxxx/                     feature directory
        dto/                    data transfer objects
        entities/               database entities (tables)
        xxxxxx.controller.ts    NestJS Controller
        xxxxxx.module.ts        NestJS module
        xxxxxx.provider.ts      NestJS provider for repository
        xxxxxx.service.ts       NestJS service (Business logic)
    constants.ts                Global constants like entity repository name
    app.module.ts               Root app module
    app.service.ts              Root app service
    app.controller.ts           Root app controller
    database.provider.ts        Database connection provider (Sequelize)
    main.ts                     Main file
test/                           Test files
```

`*.spec.ts` files are test files.
