import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qtkxilsmnhpunqdcxmdm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0a3hpbHNtbmhwdW5xZGN4bWRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MzcxOTEsImV4cCI6MjA2ODIxMzE5MX0.T1VFpJFo-9CT2hP-FgU0mvRn7sYwu9KI-sFOxD2ITCc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 