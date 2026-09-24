import { cookies } from 'next/headers';
import { UserSession } from '@/types/hotel';

const SESSION_COOKIE_NAME = 'jg_luxury_session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function getExpectedCredentials() {
  const username = process.env.AUTH_USERNAME || process.env.USERNAME || 'jolly';
  const password = process.env.AUTH_PASSWORD || process.env.PASSWORD || 'Abc@123';
  return { username, password };
}

export async function verifyCredentials(usernameInput: string, passwordInput: string): Promise<UserSession | null> {
  const { username, password } = getExpectedCredentials();

  if (usernameInput.trim() === username && passwordInput === password) {
    return {
      id: 'usr-jolly-admin',
      username: username,
      name: 'Jolly Grand General Manager',
      email: 'gm@jollygrand.com',
      role: 'ADMIN',
    };
  }

  return null;
}

export async function createSession(session: UserSession): Promise<void> {
  const cookieStore = await cookies();
  const tokenPayload = {
    ...session,
    exp: Date.now() + SESSION_MAX_AGE * 1000,
  };

  const encoded = Buffer.from(JSON.stringify(tokenPayload)).toString('base64');

  cookieStore.set(SESSION_COOKIE_NAME, encoded, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });
}

export async function getSession(): Promise<UserSession | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!cookie?.value) return null;

  try {
    const decoded = Buffer.from(cookie.value, 'base64').toString('utf-8');
    const data = JSON.parse(decoded);

    if (data.exp && Date.now() > data.exp) {
      return null;
    }

    return {
      id: data.id,
      username: data.username,
      name: data.name,
      email: data.email,
      role: data.role || 'ADMIN',
    };
  } catch {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
