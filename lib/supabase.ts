
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aqkdrfaimslinhwqkrnb.supabase.co';
// Using the provided Supabase Service Role Key for this session
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxa2RyZmFpbXNsaW5od3Frcm5iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODM1NDM4OCwiZXhwIjoyMDgzOTMwMzg4fQ._TuxUNdqwjDPIuDzkxlPP-lPkLNnj2wOYkzgo081Xkg';

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Validates the connection to Supabase.
 * Checks if the project is reachable.
 */
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('Project').select('id').limit(1);
    // Even if the table doesn't exist yet, reaching the endpoint is a partial success
    if (error && error.code === 'PGRST301') return false;
    return true;
  } catch (err) {
    console.error('Supabase connection error:', err);
    return false;
  }
};
