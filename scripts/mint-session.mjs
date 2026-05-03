// Test helper — mints a valid session cookie matching lib/auth.ts encoding.
// Run: node scripts/mint-session.mjs <email> <name>
import { createHmac } from 'node:crypto';

const SECRET = process.env.SESSION_SECRET ?? 'dev-only-secret-change-in-production';
const email = process.argv[2] ?? 'test@goldpath.dev';
const name = process.argv[3] ?? 'Tester';

const session = { email, name, issuedAt: Date.now() };
const payload = Buffer.from(JSON.stringify(session)).toString('base64url');
const sig = createHmac('sha256', SECRET).update(payload).digest('base64url');
const token = `${payload}.${sig}`;
console.log(token);
