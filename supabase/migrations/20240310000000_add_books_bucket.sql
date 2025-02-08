
-- Create a new storage bucket for books if it doesn't exist
INSERT INTO storage.buckets (id, name)
SELECT 'books', 'books'
WHERE NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'books'
);

-- Set up storage policy for authenticated users
CREATE POLICY "Users can upload their own books"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'books' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can read their own books"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'books' AND (storage.foldername(name))[1] = auth.uid()::text);
