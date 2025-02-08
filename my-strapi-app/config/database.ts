// export default ({ env }) => {
//   return {
//     connection: {
//       client: "postgres",  // Force PostgreSQL
//       connection: {
//         connectionString: env("DATABASE_URL"),
//         ssl: env.bool("DATABASE_SSL", true) ? { rejectUnauthorized: false } : false,
//       },
//       pool: { min: 2, max: 10 },
//       acquireConnectionTimeout: 60000,
//     },
//   };
// };

import path from 'path';

export default ({ env }) => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
    },
    useNullAsDefault: true,
  },
});
