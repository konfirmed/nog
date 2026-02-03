-- Create the names_of_god table
CREATE TABLE public.names_of_god (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    name text NOT NULL,
    language text NOT NULL,
    pronunciation text,
    meaning text,
    attribute text[],
    scripture_refs text[],
    context_of_use text,
    divine_personality text,
    related_names uuid[],
    notes text,
    audio_url text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT names_of_god_language_check CHECK ((language = ANY (ARRAY['yoruba'::text, 'hebrew'::text, 'mandarin'::text])))
);

-- Set ownership
ALTER TABLE public.names_of_god OWNER TO postgres;

-- Enable Row Level Security
ALTER TABLE public.names_of_god ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON public.names_of_god
    FOR SELECT USING (true);
