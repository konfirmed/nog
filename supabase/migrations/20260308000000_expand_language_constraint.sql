-- Expand language constraint to support all 10 languages
ALTER TABLE public.names_of_god
  DROP CONSTRAINT names_of_god_language_check;

ALTER TABLE public.names_of_god
  ADD CONSTRAINT names_of_god_language_check
  CHECK (language = ANY (ARRAY[
    'yoruba'::text,
    'hebrew'::text,
    'welsh'::text,
    'hindi'::text,
    'yiddish'::text,
    'hausa'::text,
    'wolof'::text,
    'haitian_creole'::text,
    'wu_chinese'::text,
    'mandarin'::text
  ]));
