
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aqkdrfaimslinhwqkrnb.supabase.co';
// Using the provided Supabase Anon Key
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxa2RyZmFpbXNsaW5od3Frcm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzNTQzODgsImV4cCI6MjA4MzkzMDM4OH0.LR33ZYLfPlDpcYvaxFQLAcRoXJuX8MdFpSo3zRmssEE';

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Validates the connection to Supabase.
 * Checks if the 'Project' table is accessible.
 */
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('Project').select('id').limit(1);
    if (error) {
      console.warn('Supabase connection check warning:', error.message);
      // Return false if the error is connectivity-related, 
      // but might return true if it's just an empty table (error code 42P01 is table not found)
      return error.code !== 'PGRST301' && error.code !== '42P01'; 
    }
    return true;
  } catch (err) {
    console.error('Supabase connection error:', err);
    return false;
  }
};
