
import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function requireUser() {
  const db = await createSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await db.auth.getUser();

  if (error || !user) {
    return {
      db,
      user: null,
      response: NextResponse.json(
        { error: 'Authentication required. Please sign in.' },
        { status: 401 }
      ),
    };
  }

  return {
    db,
    user,
    response: null,
  };
}
