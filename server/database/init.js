import initSqlJs from 'sql.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = process.env.DATABASE_PATH || join(__dirname, 'contacts.db');

let db;

// Initialize database
const initDatabase = async () => {
  const SQL = await initSqlJs();

  // Load existing database or create new one
  let buffer;
  if (fs.existsSync(dbPath)) {
    buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  // Create contacts table
  db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      service TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      ip_address TEXT,
      user_agent TEXT
    )
  `);

  // Create indexes
  db.run(`CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at)`);

  // Save database to file
  saveDatabase();

  console.log('✅ Database initialized successfully');
};

// Save database to file
const saveDatabase = () => {
  if (db) {
    const data = db.export();
    fs.writeFileSync(dbPath, data);
  }
};

// Initialize on module load
await initDatabase();

// Export database operations
export const runQuery = (sql, params = []) => {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const result = stmt.step();
  stmt.free();
  saveDatabase();
  return result;
};

export const getAll = (sql, params = []) => {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const results = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
};

export const insert = (sql, params = []) => {
  db.run(sql, params);
  const lastId = db.exec("SELECT last_insert_rowid() as id")[0].values[0][0];
  saveDatabase();
  return lastId;
};

export default { runQuery, getAll, insert, saveDatabase };
