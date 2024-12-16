const pool = require("../config/pool");
async function createDatabase() {
  await pool.connect(); // Reconnect to the database pool after closing it
  console.log("Reconnected to the database.");
  const { rows } = await pool.query(`
  SELECT table_name
  FROM information_schema.tables
  WHERE table_schema = 'public';
`);
  await pool
    .query(`DROP TABLE IF EXISTS users CASCADE;`)
    .then(() => console.log("users table dropped"))
    .catch((err) => console.error("Error dropping users table", err));
  await pool
    .query(`DROP TABLE IF EXISTS answers CASCADE;`)
    .then(() => console.log("answers table dropped"))
    .catch((err) => console.error("Error dropping answers table", err));
  await pool
    .query(`DROP TABLE IF EXISTS questions CASCADE;`)
    .then(() => console.log("questions table dropped"))
    .catch((err) => console.error("Error dropping questions table", err));
  await pool
    .query(`DROP TABLE IF EXISTS interests CASCADE;`)
    .then(() => console.log("interests table dropped"))
    .catch((err) => console.error("Error dropping interests table", err));
  await pool
    .query(`DROP TABLE IF EXISTS communities CASCADE;`)
    .then(() => console.log("communities table dropped"))
    .catch((err) => console.error("Error dropping communities table", err));
  await pool
    .query(`DROP TABLE IF EXISTS user_interests;`)
    .then(() => console.log("user_interests table dropped"))
    .catch((err) => console.error("Error dropping users_interests table", err));
  await pool
    .query(`DROP TABLE IF EXISTS user_communities;`)
    .then(() => console.log("users_coommuntities table dropped"))
    .catch((err) =>
      console.error("Error dropping users_communities table", err)
    );

  console.log(rows, "tables");
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
    // await deleteDatabase();
    await createDatabase().then(console.log("Database created successfully."));
  } catch (err) {
    console.error("Error creating database:", err.message);
  }
})();
