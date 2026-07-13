
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- Bikes
CREATE TABLE public.bikes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand text NOT NULL,
  model text NOT NULL,
  year int NOT NULL,
  price numeric(12,2) NOT NULL,
  km_driven int NOT NULL DEFAULT 0,
  plate_number text NOT NULL,
  location text NOT NULL,
  condition text NOT NULL DEFAULT 'Good',
  owner_number int NOT NULL DEFAULT 1,
  papers_status text NOT NULL DEFAULT 'Complete',
  chalaan_cleared boolean NOT NULL DEFAULT true,
  description text,
  images text[] NOT NULL DEFAULT '{}',
  sold boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.bikes TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bikes TO authenticated;
GRANT ALL ON public.bikes TO service_role;

ALTER TABLE public.bikes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view bikes"
  ON public.bikes FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can insert bikes"
  ON public.bikes FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update bikes"
  ON public.bikes FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete bikes"
  ON public.bikes FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER bikes_set_updated_at
  BEFORE UPDATE ON public.bikes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX bikes_created_at_idx ON public.bikes (created_at DESC);
CREATE INDEX bikes_sold_idx ON public.bikes (sold);
