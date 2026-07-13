import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export type Bike = Tables<"bikes">;
export type BikeInsert = TablesInsert<"bikes">;
export type BikeUpdate = TablesUpdate<"bikes">;

export async function fetchBikes(): Promise<Bike[]> {
  const { data, error } = await supabase
    .from("bikes")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function fetchBike(id: string): Promise<Bike | null> {
  const { data, error } = await supabase.from("bikes").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

export function formatPrice(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function imageUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const { data } = supabase.storage.from("bike-images").getPublicUrl(path);
  return data.publicUrl;
}
