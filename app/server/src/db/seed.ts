/* Seed demo LP (Macquarie Pension Trust) for development */
import 'dotenv/config';
import { pool, query } from './client';

async function seed() {
  console.log('Seeding demo data…');

  // Fund I
  await pool.query(`
    INSERT INTO funds (id, code, name, vintage, currency, target_size, status)
    VALUES (
      'aaaaaaaa-0001-0001-0001-aaaaaaaaaaaa',
      'ACP-I', 'ACP Fund I', 2023, 'AUD', 30000000000, 'closed'
    )
    ON CONFLICT (code) DO NOTHING
  `);

  // Fund II
  await pool.query(`
    INSERT INTO funds (id, code, name, vintage, currency, target_size, status)
    VALUES (
      'aaaaaaaa-0002-0002-0002-aaaaaaaaaaaa',
      'ACP-II', 'ACP Fund II', 2025, 'AUD', 75000000000, 'open'
    )
    ON CONFLICT (code) DO NOTHING
  `);

  // Demo LP user
  await pool.query(`
    INSERT INTO users (id, email, name, firm, role)
    VALUES (
      'bbbbbbbb-0001-0001-0001-bbbbbbbbbbbb',
      'demo@macquarie.com',
      'Sarah Chen',
      'Macquarie Pension Trust',
      'Senior Portfolio Manager'
    )
    ON CONFLICT (email) DO NOTHING
  `);

  // Commitments
  await pool.query(`
    INSERT INTO lp_commitments (user_id, fund_id, commitment, called, distributed, nav, tvpi, dpi, rvpi, irr, as_of_date)
    VALUES (
      'bbbbbbbb-0001-0001-0001-bbbbbbbbbbbb',
      'aaaaaaaa-0001-0001-0001-aaaaaaaaaaaa',
      3000000000, 2820000000, 1180000000, 3650000000,
      1.71, 0.42, 1.29, 18.4, '2026-03-31'
    )
    ON CONFLICT (user_id, fund_id) DO NOTHING
  `);

  await pool.query(`
    INSERT INTO lp_commitments (user_id, fund_id, commitment, called, distributed, nav, tvpi, dpi, rvpi, irr, as_of_date)
    VALUES (
      'bbbbbbbb-0001-0001-0001-bbbbbbbbbbbb',
      'aaaaaaaa-0002-0002-0002-aaaaaaaaaaaa',
      4500000000, 675000000, 0, 720000000,
      1.07, 0.00, 1.07, null, '2026-03-31'
    )
    ON CONFLICT (user_id, fund_id) DO NOTHING
  `);

  // Capital calls
  const calls = [
    { n: 1, amount: 75000000000, due: '2024-04-01', paid: '2024-03-28', status: 'paid' },
    { n: 2, amount: 33750000000, due: '2024-10-01', paid: '2024-09-29', status: 'paid' },
    { n: 3, amount: 18750000000, due: '2025-04-01', paid: null, status: 'pending' },
  ];
  for (const c of calls) {
    await pool.query(`
      INSERT INTO capital_calls (fund_id, user_id, call_number, amount, due_date, paid_date, status)
      VALUES (
        'aaaaaaaa-0002-0002-0002-aaaaaaaaaaaa',
        'bbbbbbbb-0001-0001-0001-bbbbbbbbbbbb',
        $1, $2, $3, $4, $5
      )
      ON CONFLICT DO NOTHING
    `, [c.n, c.amount, c.due, c.paid, c.status]);
  }

  // Documents
  const docs = [
    { title: 'ACP Fund II — Subscription Agreement', cat: 'subscription', key: 'docs/fund-ii-subscription.pdf' },
    { title: 'Q1 2026 Quarterly Report — Fund I', cat: 'quarterly_report', key: 'docs/fund-i-q1-2026.pdf' },
    { title: 'Q4 2025 Quarterly Report — Fund I', cat: 'quarterly_report', key: 'docs/fund-i-q4-2025.pdf' },
    { title: 'ACP Fund II — Limited Partnership Agreement', cat: 'nda', key: 'docs/fund-ii-lpa.pdf' },
    { title: 'Capital Call Notice #3 — Fund II', cat: 'notice', key: 'docs/fund-ii-call-3.pdf' },
  ];
  for (const d of docs) {
    await pool.query(`
      INSERT INTO documents (user_id, fund_id, title, category, s3_key, size_bytes)
      VALUES (
        'bbbbbbbb-0001-0001-0001-bbbbbbbbbbbb',
        'aaaaaaaa-0002-0002-0002-aaaaaaaaaaaa',
        $1, $2, $3, $4
      )
      ON CONFLICT (s3_key) DO NOTHING
    `, [d.title, d.cat, d.key, Math.floor(Math.random() * 2_000_000) + 200_000]);
  }

  // Messages
  await pool.query(`
    INSERT INTO messages (user_id, direction, subject, body, read_at)
    VALUES (
      'bbbbbbbb-0001-0001-0001-bbbbbbbbbbbb',
      'gp_to_lp',
      'Fund II Capital Call #3 — April 2025',
      'Dear Sarah,\n\nPlease find enclosed Capital Call Notice #3 for ACP Fund II. The call amount of A$18.75M represents 25% of your A$75M commitment and is due 1 April 2025.\n\nNote that this call funds the digital infrastructure mandate announced in our Q4 2025 letter.\n\nKind regards,\nJoshua Ting\nExecutive Managing Partner',
      null
    )
  `);

  console.log('✓ Demo data seeded');
  await pool.end();
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
