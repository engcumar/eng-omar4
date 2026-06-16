
-- 1) Restrict has_role: SECURITY INVOKER + tighter EXECUTE grants.
-- user_roles SELECT policy already lets users read their own roles, so
-- has_role(auth.uid(), '...') still works for authenticated callers.
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, anon, service_role;

-- 2) Replace permissive WITH CHECK (true) on contact_messages with input validation
DROP POLICY IF EXISTS "anyone can submit" ON public.contact_messages;

CREATE POLICY "anyone can submit"
ON public.contact_messages
FOR INSERT
TO public
WITH CHECK (
  length(btrim(name))    BETWEEN 1 AND 120
  AND length(btrim(phone))   BETWEEN 5 AND 30
  AND length(btrim(subject)) BETWEEN 1 AND 200
  AND length(btrim(message)) BETWEEN 1 AND 5000
);
