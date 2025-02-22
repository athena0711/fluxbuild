import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Supabase from "@/lib/supabase";
import LoginCard from "./LoginCard";
import { dashboardPage } from "@/constants";

interface LoginT {
  redirect?: boolean;
}

const Login: React.FC<LoginT> = ({ redirect = true }) => {
  const navigate = useNavigate();

  useEffect(() => {
    Supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        redirect && navigate(dashboardPage);
      }
    });
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center px-4 bg-white-50 absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <LoginCard />
    </div>
  );
};

export default Login;
