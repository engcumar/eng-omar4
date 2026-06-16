DROP POLICY IF EXISTS "Anyone can insert contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can view all contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Users can view own contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "anyone can submit" ON public.contact_messages;

ALTER TABLE public.contact_messages RENAME COLUMN name TO full_name;
ALTER TABLE public.contact_messages DROP COLUMN IF EXISTS phone;
ALTER TABLE public.contact_messages DROP COLUMN IF EXISTS subject;
ALTER TABLE public.contact_messages ADD COLUMN IF NOT EXISTS email text NOT NULL DEFAULT '';
ALTER TABLE public.contact_messages ALTER COLUMN email DROP DEFAULT;

CREATE POLICY "Anyone can insert contact messages" ON public.contact_messages
FOR INSERT TO anon, authenticated
WITH CHECK (length(full_name) >= 1 AND length(full_name) <= 120
  AND length(email) >= 3 AND length(email) <= 255
  AND length(message) >= 1 AND length(message) <= 5000);

CREATE POLICY "Admins can view all contact messages" ON public.contact_messages
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));