// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://etwaqcuvximhlqfqyzle.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0d2FxY3V2eGltaGxxZnF5emxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0Mjc3NjUsImV4cCI6MjA1OTAwMzc2NX0.PwFsHfV4XnsetXIq5ZdetuTMXYBHEU62YLHkUfcV7D0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);