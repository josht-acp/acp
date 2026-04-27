import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { pool } from './client';

async function migrate() {
  const schemaPath = path.join(__dirname, '../../../db/schema.sql');
  const sql = fs.readFileSync(schemaPath, 'utf8');

  console.log('Running migrations…');
  await pool.query(sql);
  console.log('✓ Schema applied');

  await pool.end();
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
