

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

export async function requireStaff() {
  const auth = await requireUser();

  if (auth.response || !auth.user) {
    return auth;
  }

  const { data: profile, error } = await auth.db
    .from('profiles')
    .select('role')
    .eq('id', auth.user.id)
    .maybeSingle();

  if (error || !profile || profile.role !== 'staff') {
    return {
      db: auth.db,
      user: null,
      response: NextResponse.json(
        { error: 'Staff access required.' },
        { status: 403 }
      ),
    };
  }

  return {
    db: auth.db,
    user: auth.user,
    response: null,
  };
}
