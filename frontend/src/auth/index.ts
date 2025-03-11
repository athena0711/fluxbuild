import Supabase from "@/lib/supabase";

export const getToken = async () => {
  const session = await Supabase.auth.getSession();
  return session?.data.session?.access_token;
};
