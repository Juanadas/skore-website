// src/lib/db/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Cliente con service role — solo para uso en API routes (server-side)
// NUNCA exponer en el cliente
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});

// Cliente anon — seguro para usar en el navegador si lo necesitas
export const supabase = createClient(supabaseUrl, supabaseAnonKey);