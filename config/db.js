const pool = require("../config/pool");

async function deleteDatabase() {
  await pool.query(`DROP TABLE IF EXISTS users CASCADE;`);
  await pool.query(`DROP TABLE IF EXISTS answers CASCADE;`);
  await pool.query(`DROP TABLE IF EXISTS questions CASCADE;`);
  await pool.query(`DROP TABLE IF EXISTS interests CASCADE;`);
  await pool.query(`DROP TABLE IF EXISTS communities CASCADE;`);
  await pool.query(`DROP TABLE IF EXISTS user_interests;`);
  await pool.query(`DROP TABLE IF EXISTS user_communities;`);
}
async function createDatabase() {
  await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

  await pool.query(
    `CREATE TABLE users(id uuid DEFAULT uuid_generate_v4() PRIMARY KEY, username VARCHAR(255), password VARCHAR(255), name VARCHAR(255), email VARCHAR(255), date_joined DATE, google_id VARCHAR(255), facebook_id VARCHAR(255));`
  );
  await pool.query(
    `CREATE TABLE interests (id uuid DEFAULT uuid_generate_v4() PRIMARY KEY, name VARCHAR(255) UNIQUE NOT NULL);`
  );
  await pool.query(
    `CREATE TABLE communities (id uuid DEFAULT uuid_generate_v4() PRIMARY KEY, name VARCHAR(255) UNIQUE NOT NULL);`
  );
  await pool.query(
    `CREATE TABLE questions(id uuid DEFAULT uuid_generate_v4() PRIMARY KEY, question VARCHAR(255), asked_by uuid DEFAULT uuid_generate_v4(), subject VARCHAR(255), tags JSON, date_asked DATE);`
  );
  await pool.query(
    `CREATE TABLE answers(id uuid DEFAULT uuid_generate_v4() PRIMARY KEY, answer VARCHAR(255), answered_by uuid DEFAULT uuid_generate_v4(), question_id uuid DEFAULT uuid_generate_v4(), email VARCHAR(255), date_answered DATE, upvotes_num INT);`
  );
  await pool.query(
    `CREATE TABLE user_interests (user_id uuid REFERENCES users(id) ON DELETE CASCADE, interest_id uuid REFERENCES interests(id) ON DELETE CASCADE, PRIMARY KEY (user_id, interest_id));`
  );
  await pool.query(
    `CREATE TABLE user_communities (user_id uuid REFERENCES users(id) ON DELETE CASCADE, community_id uuid REFERENCES communities(id) ON DELETE CASCADE, PRIMARY KEY (user_id, community_id));`
  );
}

(async () => {
  try {
    await deleteDatabase();
    await createDatabase();
    console.log("Database deleted successfully.");
  } catch (err) {
    console.error("Error creating database:", err.message);
  }
})();
