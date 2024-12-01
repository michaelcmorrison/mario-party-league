import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://snzklcwzkvgfzqgugtmi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuemtsY3d6a3ZnZnpxZ3VndG1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwMzU2NzQsImV4cCI6MjA0ODYxMTY3NH0.cgm4k-C5DVR9FkgAhjIB8LAgigpT-NA8wulEm4F8hu4";
export const supabase = createClient(supabaseUrl, supabaseKey);
