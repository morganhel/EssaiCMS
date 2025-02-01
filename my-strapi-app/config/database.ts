export default ({ env }) => {
  return {
    connection: {
      client: "postgres",  // Force PostgreSQL
      connection: {
        connectionString: env("DATABASE_URL"),
        ssl: env.bool("DATABASE_SSL", true) ? { rejectUnauthorized: false } : false,
      },
      pool: { min: 2, max: 10 },
      acquireConnectionTimeout: 60000,
    },
  };
};