"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | null | undefined;

export function getSupabaseBrowserClient(): SupabaseClient | null {
  if (browserClient !== undefined) return browserClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

  if (!url || !publishableKey) {
    if (process.env.NODE_ENV === "development") {
      console.info("Supabase wishes are disabled until the public environment variables are configured.");
    }
    browserClient = null;
    return browserClient;
  }

  browserClient = createBrowserClient(url, publishableKey);
  return browserClient;
}
