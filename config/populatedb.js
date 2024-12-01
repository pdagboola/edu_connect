const pool = require("./pool");

class Populate {
  createDatabase = async () => {
    await pool.query(`DROP TABLE IF EXISTS users;`);
    await pool.query(`DROP TABLE IF EXISTS answers;`);
    await pool.query(`DROP TABLE IF EXISTS questions;`);
    await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await pool.query(
      `CREATE TABLE users(id uuid DEFAULT uuid_generate_v4() PRIMARY KEY, username VARCHAR(255), password VARCHAR(255), name VARCHAR(255), email VARCHAR(255), date_joined DATE, communities JSON, interests JSON);`
    );
    await pool.query(
      `CREATE TABLE questions(id uuid DEFAULT uuid_generate_v4() PRIMARY KEY, question VARCHAR(255), asked_by uuid DEFAULT uuid_generate_v4(), subject VARCHAR(255), tags JSON, date_asked DATE);`
    );
    await pool.query(
      `CREATE TABLE answers(id uuid DEFAULT uuid_generate_v4() PRIMARY KEY, answer VARCHAR(255), answered_by uuid DEFAULT uuid_generate_v4(), question_id uuid DEFAULT uuid_generate_v4(), email VARCHAR(255), date_answered DATE, upvotes_num INT);`
    );
  };
}

const populate = new Populate();
populate.createDatabase();
