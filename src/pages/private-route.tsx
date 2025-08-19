import {useAuth} from "@/hooks/use-auth.store";

import {  useEffect } from "react";
import { Outlet, Navigate } from "react-router";

export function PrivateRoute() {

  const { initialize, isAuthenticated} = useAuth()
  
  useEffect(()=> {
    initialize()
  }, [])

  return (isAuthenticated ? <Outlet /> : <Navigate  to='/login' replace />)
  
}

