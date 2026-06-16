
CREATE TABLE public.course_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_slug text NOT NULL,
  payment_status text NOT NULL DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid','paid')),
  access_granted boolean NOT NULL DEFAULT false,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, course_slug)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.course_enrollments TO authenticated;
GRANT ALL ON public.course_enrollments TO service_role;

ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;

-- Users can view their own enrollments
CREATE POLICY "Users view own enrollments"
ON public.course_enrollments FOR SELECT TO authenticated
USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- Users can create their own enrollment requests (payment_status forced unpaid, access false)
CREATE POLICY "Users create own enrollment"
ON public.course_enrollments FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid() AND payment_status = 'unpaid' AND access_granted = false);

-- Only admins can update enrollments (payment confirmation, granting access)
CREATE POLICY "Admins update enrollments"
ON public.course_enrollments FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete
CREATE POLICY "Admins delete enrollments"
ON public.course_enrollments FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_course_enrollments_updated_at
BEFORE UPDATE ON public.course_enrollments
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Helper: has the user got paid+granted access to a given course?
CREATE OR REPLACE FUNCTION public.has_course_access(_user_id uuid, _course_slug text)
RETURNS boolean
LANGUAGE sql STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.course_enrollments
    WHERE user_id = _user_id
      AND course_slug = _course_slug
      AND payment_status = 'paid'
      AND access_granted = true
  ) OR public.has_role(_user_id, 'admin');
$$;

REVOKE EXECUTE ON FUNCTION public.has_course_access(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_course_access(uuid, text) TO authenticated, service_role;
