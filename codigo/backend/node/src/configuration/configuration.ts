export default () => ({
  env: process.env.NODE_ENV || 'development',
  port: +process.env.PORT || 3333,
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
      deploys: {
        req: {
          routingKey: 'apps.deploy.req',
        },
        res: {
          routingKey: 'apps.deploy.res',
          queue: 'apps.deploy.res',
        },
      },
      envs: {
        req: {
          routingKey: 'apps.envs.req',
        },
        res: {
          routingKey: 'apps.envs.res',
          queue: 'apps.envs.res',
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
      rollback: {
        req: {
          routingKey: 'apps.rollback.req',
        },
        res: {
          routingKey: 'apps.rollback.res',
          queue: 'apps.rollback.res',
        },
      },
      revert: {
        req: {
          routingKey: 'apps.revert.req',
        },
        res: {
          routingKey: 'apps.revert.res',
          queue: 'apps.revert.res',
        },
      },
    },
    plugins: {
      deploy: {
        req: {
          routingKey: 'plugins.deploy.req',
        },
        res: {
          routingKey: 'plugins.deploy.res',
          queue: 'plugins.deploy.res',
        },
      },
    },
    user: process.env.AMPQ_USER || 'guest',
    password: process.env.AMPQ_PASSWORD || 'guest',
    protocol: process.env.AMPQ_PROTOCOL || 'amqp',
    host: process.env.AMPQ_HOST || 'localhost',
    port: +process.env.AMPQ_PORT || '5672',
    virtualHost: process.env.AMPQ_VIRTUAL_HOST || '',
    defaultExchange: 'amq.topic',
  },
});
