import { Outlet } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import Supabase from "@/lib/supabase";
import { useEffect, useState } from "react";
import Login from "@/pages/login/Login";
import useAppState from "@/state";

const PrivateRoute = () => {
  const [userSession, setUserSession] = useState<Session | null>(null);
  const setUserInfo = useAppState((state) => state.setUserInfo);
  const [isLoading, setIsLoading] = useState(false);

  // AUTHENTICATION
  useEffect(() => {
    Supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUserSession(session);
      if (session && !isLoading) {
        setUserInfo({
          id: session.user.id,
        });
        setIsLoading(true);
        setIsLoading(false);
      }
    });

    const {
      data: { subscription },
    } = Supabase.auth.onAuthStateChange((_event, session) => {
      setUserSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [userSession]);

  if (!userSession) {
    return <Login redirect={false} />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;
