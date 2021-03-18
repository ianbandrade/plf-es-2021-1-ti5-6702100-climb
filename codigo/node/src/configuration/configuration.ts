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
  versionControl: {
    github: {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
    gitlab: {
      clientID: process.env.GITLAB_CLIENT_ID,
      clientSecret: process.env.GITLAB_CLIENT_SECRET,
      redirectURI: process.env.GITLAB_REDIRECT_URI,
    },
  },
});
