// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import fs = require('fs');

fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify(
    {
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: +process.env.DATABASE_PORT || 5432,
      database: process.env.DATABASE_NAME || 'database',
      username: process.env.DATABASE_USERNAME || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/migrations/*.js'],
      cli: {
        migrationsDir: 'dist/migrations',
      },
    },
    null,
    2,
  ),
);
