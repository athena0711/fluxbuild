import { VITE_PUBLIC_SUPABASE_ANON_KEY, VITE_SUPABASE_URL } from "@/constants";
import { createClient } from "@supabase/supabase-js";

const Supabase = createClient(VITE_SUPABASE_URL, VITE_PUBLIC_SUPABASE_ANON_KEY);

export default Supabase