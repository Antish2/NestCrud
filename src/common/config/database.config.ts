// import { registerAs } from "@nestjs/config";

// console.log(process.env.DB_HOST);

// export default registerAs('database', () => ({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT || 5432,
//   url: process.env.DATABASE_URL
// }));

export default {
  DATABASE_URL: process.env.DATABASE_URL,
};

//host:"THIS IS TEST"
