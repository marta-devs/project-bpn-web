import useAuth from "@/hooks/use-auth";
import type { Usuario } from "@/interfaces/usuario";
import { Login } from "@/pages/auth/login";
import { createContext } from "react";
import { Outlet } from "react-router";

export type AuthContextProps = {
  user: Usuario | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  handleLogin: (url: string, data: any) => void;
  handleLogout: () => void;
};

export const AuthContext = createContext({} as AuthContextProps);

function AuthLayout() {
  const { handleLogin, handleLogout, isAuthenticated, isLoading, user } =
    useAuth();

  return (
    <AuthContext.Provider
      value={{ handleLogin, handleLogout, isAuthenticated, isLoading, user }}
    >
      {isAuthenticated ? <Outlet /> : <Login />}
    </AuthContext.Provider>
  );
}

export { AuthLayout };
