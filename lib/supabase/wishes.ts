"use client";

import { getSupabaseBrowserClient } from "./client";

export type Wish = {
  id: number;
  name: string;
  message: string;
  created_at: string;
};

export type WishInput = Pick<Wish, "name" | "message">;

export function isWish(value: unknown): value is Wish {
  if (!value || typeof value !== "object") return false;
  const row = value as Record<string, unknown>;
  return typeof row.id === "number"
    && typeof row.name === "string"
    && row.name.trim().length > 0
    && row.name.length <= 50
    && typeof row.message === "string"
    && row.message.trim().length > 0
    && row.message.length <= 300
    && typeof row.created_at === "string";
}

export async function fetchApprovedWishes(): Promise<Wish[]> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) throw new Error("SUPABASE_NOT_CONFIGURED");

  const { data, error } = await supabase
    .from("wishes")
    .select("id,name,message,created_at")
    .eq("approved", true)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) throw error;
  const rows: unknown[] = data ?? [];
  return rows.filter(isWish);
}

export async function insertWish(input: WishInput): Promise<Wish> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) throw new Error("SUPABASE_NOT_CONFIGURED");
  const { data, error } = await supabase
    .from("wishes")
    .insert({ name: input.name, message: input.message })
    .select("id,name,message,created_at")
    .single();
  if (error) throw error;
  const row: unknown = data;
  if (!isWish(row)) throw new Error("INVALID_WISH_RESPONSE");
  return row;
}

export function subscribeToWishInserts(onWish: (wish: Wish) => void): () => void {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return () => undefined;

  const channel = supabase
    .channel("public-wishes-inserts")
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "wishes" }, (payload) => {
      const row: unknown = payload.new;
      if (isWish(row)) onWish(row);
    })
    .subscribe();

  return () => { void supabase.removeChannel(channel); };
}
