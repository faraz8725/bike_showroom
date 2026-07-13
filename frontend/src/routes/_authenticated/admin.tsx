import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X, Upload, Loader2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { fetchBikes, formatPrice, imageUrl, type Bike, type BikeInsert } from "@/lib/bikes";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminPage,
});

function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Bike | null>(null);
  const [open, setOpen] = useState(false);
  const [grantingSelf, setGrantingSelf] = useState(false);

  const { data: bikes } = useQuery({ queryKey: ["bikes"], queryFn: fetchBikes });

  const delMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("bikes").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Bike removed");
      qc.invalidateQueries({ queryKey: ["bikes"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  async function grantSelfAdmin() {
    if (!user) return;
    setGrantingSelf(true);
    // Check if any admin already exists
    const { count } = await supabase
      .from("user_roles")
      .select("*", { count: "exact", head: true })
      .eq("role", "admin");
    if ((count ?? 0) > 0) {
      setGrantingSelf(false);
      return toast.error("An admin already exists. Ask them to grant you access.");
    }
    const { error } = await supabase.from("user_roles").insert({ user_id: user.id, role: "admin" });
    setGrantingSelf(false);
    if (error) return toast.error(error.message);
    toast.success("You are now the admin. Reloading…");
    setTimeout(() => window.location.reload(), 800);
  }

  useEffect(() => {
    // no-op
  }, []);

  if (loading) {
    return (
      <>
        <SiteHeader />
        <div className="p-8 text-center text-muted-foreground">Loading…</div>
      </>
    );
  }

  if (!isAdmin) {
    return (
      <>
        <SiteHeader />
        <div className="mx-auto max-w-md p-8 text-center">
          <h1 className="font-display text-3xl uppercase">Not an admin</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account isn't the site admin yet. If you're the site owner, claim admin access below (available only if no admin exists).
          </p>
          <Button
            onClick={grantSelfAdmin}
            disabled={grantingSelf}
            className="mt-6 bg-gradient-flame text-flame-foreground"
          >
            {grantingSelf ? "Working…" : "Claim admin access"}
          </Button>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Admin</p>
            <h1 className="truncate font-display text-4xl uppercase tracking-wide">Inventory</h1>
          </div>
          <Button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
            className="gap-1.5 bg-gradient-flame text-flame-foreground"
          >
            <Plus className="h-4 w-4" /> Add bike
          </Button>
        </div>

        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left uppercase tracking-wider text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Bike</th>
                <th className="px-4 py-3">Plate</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {bikes?.map((b) => (
                <tr key={b.id} className="border-t border-border">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-16 shrink-0 overflow-hidden rounded bg-muted">
                        {b.images[0] && <img src={imageUrl(b.images[0])} alt="" className="h-full w-full object-cover" />}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-semibold">
                          {b.brand} {b.model}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {b.year} • {b.km_driven.toLocaleString()} km
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{b.plate_number}</td>
                  <td className="px-4 py-3 font-semibold">{formatPrice(Number(b.price))}</td>
                  <td className="px-4 py-3">
                    {b.sold ? (
                      <span className="rounded bg-destructive/20 px-2 py-0.5 text-xs font-semibold text-destructive">Sold</span>
                    ) : (
                      <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-400">Available</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm" onClick={() => { setEditing(b); setOpen(true); }}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (confirm(`Delete ${b.brand} ${b.model}?`)) delMutation.mutate(b.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {(!bikes || bikes.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                    No bikes yet. Click “Add bike” to create your first listing.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <BikeFormDialog
        open={open}
        onOpenChange={setOpen}
        editing={editing}
        onSaved={() => qc.invalidateQueries({ queryKey: ["bikes"] })}
      />
    </div>
  );
}

function BikeFormDialog({
  open,
  onOpenChange,
  editing,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  editing: Bike | null;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<BikeInsert>(blank());
  const [images, setImages] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (editing) {
      setForm({ ...editing });
      setImages(editing.images);
    } else {
      setForm(blank());
      setImages([]);
    }
  }, [editing, open]);

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("bike-images").upload(path, file);
      if (error) {
        toast.error(error.message);
      } else {
        uploaded.push(path);
      }
    }
    setImages((prev) => [...prev, ...uploaded]);
    setUploading(false);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, images };
    let error;
    if (editing) {
      ({ error } = await supabase.from("bikes").update(payload).eq("id", editing.id));
    } else {
      ({ error } = await supabase.from("bikes").insert(payload));
    }
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(editing ? "Bike updated" : "Bike added");
    onSaved();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl uppercase tracking-wide">
            {editing ? "Edit bike" : "Add new bike"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={save} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Brand" value={form.brand} onChange={(v) => setForm({ ...form, brand: v })} />
            <Field label="Model" value={form.model} onChange={(v) => setForm({ ...form, model: v })} />
            <Field label="Year" type="number" value={String(form.year)} onChange={(v) => setForm({ ...form, year: +v })} />
            <Field label="Price (₹)" type="number" value={String(form.price)} onChange={(v) => setForm({ ...form, price: +v })} />
            <Field label="KM driven" type="number" value={String(form.km_driven)} onChange={(v) => setForm({ ...form, km_driven: +v })} />
            <Field label="Owner number" type="number" value={String(form.owner_number)} onChange={(v) => setForm({ ...form, owner_number: +v })} />
            <Field label="Plate number" value={form.plate_number} onChange={(v) => setForm({ ...form, plate_number: v.toUpperCase() })} />
            <Field label="Location" value={form.location} onChange={(v) => setForm({ ...form, location: v })} />
            <Field label="Condition" value={form.condition ?? ""} onChange={(v) => setForm({ ...form, condition: v })} />
            <Field label="Papers status" value={form.papers_status ?? ""} onChange={(v) => setForm({ ...form, papers_status: v })} />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <p className="text-sm font-semibold">Chalaan cleared</p>
              <p className="text-xs text-muted-foreground">No pending challans on this bike</p>
            </div>
            <Switch
              checked={!!form.chalaan_cleared}
              onCheckedChange={(v) => setForm({ ...form, chalaan_cleared: v })}
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div>
              <p className="text-sm font-semibold">Mark as sold</p>
              <p className="text-xs text-muted-foreground">Show a SOLD badge on the listing</p>
            </div>
            <Switch checked={!!form.sold} onCheckedChange={(v) => setForm({ ...form, sold: v })} />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              rows={4}
              value={form.description ?? ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div>
            <Label>Photos</Label>
            <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {images.map((img) => (
                <div key={img} className="group relative aspect-square overflow-hidden rounded-md border border-border">
                  <img src={imageUrl(img)} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImages(images.filter((i) => i !== img))}
                    className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-background/80 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              <label className="grid aspect-square cursor-pointer place-items-center rounded-md border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary">
                {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleUpload(e.target.files)}
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="bg-gradient-flame text-flame-foreground">
              {saving ? "Saving…" : editing ? "Save changes" : "Add bike"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} required />
    </div>
  );
}

function blank(): BikeInsert {
  return {
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    price: 0,
    km_driven: 0,
    plate_number: "",
    location: "",
    condition: "Good",
    owner_number: 1,
    papers_status: "Complete",
    chalaan_cleared: true,
    description: "",
    images: [],
    sold: false,
  };
}
