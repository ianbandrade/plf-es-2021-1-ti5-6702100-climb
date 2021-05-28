export default () => ({
  env: process.env.NODE_ENV || 'development',
  port: +process.env.PORT || 3333,
  publicHost: process.env.NEST_PUBLIC_API_HOST || undefined,
  prometheusHost: process.env.PROMETHEUS_HOST || undefined,
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: +process.env.REDIS_PORT || 6379,
  },
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: +process.env.DATABASE_PORT || 5432,
    name: process.env.DATABASE_NAME || 'database',
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
  },
  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@example.com',
    name: process.env.ADMIN_NAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'password',
  },
  versionControl: {
    github: {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
    gitlab: {
      clientID: process.env.GITLAB_CLIENT_ID,
      clientSecret: process.env.GITLAB_CLIENT_SECRET,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secretKey',
    signOptions: {
      expiresIn: process.env.JWT_EXPIRES_IN || 18000,
    },
  },
  encryption: {
    key: process.env.ENCRYPTION_KEY || 'a'.repeat(64),
    iv: process.env.ENCRYPTION_IV || 'a'.repeat(32),
  },
  amqp: {
    apps: {
      create: {
        req: {
          routingKey: 'apps.create.req',
        },
        res: {
          routingKey: 'apps.create.res',
          queue: 'apps.create.res',
        },
      },
      update: {
        req: {
          routingKey: 'apps.update.req',
        },
        res: {
          routingKey: 'apps.update.res',
          queue: 'apps.update.res',
        },
      },
      delete: {
        req: {
          routingKey: 'apps.delete.req',
        },
        res: {
          routingKey: 'apps.delete.res',
          queue: 'apps.delete.res',
        },
      },
    },
    plugins: {
      create: {
        req: {
          routingKey: 'plugins.create.req',
        },
        res: {
          routingKey: 'plugins.create.res',
          queue: 'plugins.create.res',
        },
      },
      delete: {
        req: {
          routingKey: 'plugins.delete.req',
        },
        res: {
          routingKey: 'plugins.delete.res',
          queue: 'plugins.delete.res',
        },
      },
    },
    user: process.env.AMQP_USER || 'guest',
    password: process.env.AMQP_PASSWORD || 'guest',
    protocol: process.env.AMQP_PROTOCOL || 'amqp',
    host: process.env.AMQP_HOST || 'localhost',
    port: +process.env.AMQP_PORT || '5672',
    virtualHost: process.env.AMQP_VIRTUAL_HOST || '',
    defaultExchange: 'amq.topic',
  },
});
