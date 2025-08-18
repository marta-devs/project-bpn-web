import {useAuth} from "@/hooks/use-auth.store";

import {  useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export function AuthLayout() {
  const navigate = useNavigate()
  const {usuario, initialize, token} = useAuth()
  
  useEffect(()=> {
    if(!token && !usuario){
      navigate('/login')
    }
    initialize()
  }, [token, usuario])

  return <Outlet />
}

