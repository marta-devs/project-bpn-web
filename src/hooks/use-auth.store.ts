import type { Usuario } from "@/interfaces/usuario";
import { instanceAxios } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { create } from 'zustand';
import {persist} from 'zustand/middleware'

export interface AuthStore {
  token: string | null,
  usuario: Usuario | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  initialize: ()=> string | null | undefined;
  onLogin: (url: string, data: any)=> Promise<void>;
  onLogout: () => void  
}

export const useAuth = create<AuthStore>()(
  persist((set, get)=> ({
    token: null,
    usuario: null,
    error: null,
    isAuthenticated: false,
    isLoading: false,
    onLogin: async (url: string, body: any) => {
      try {
        set({
          isLoading: true
        })
        const { data: {data: {token, usuario}} } = await instanceAxios.post(url, body);
        instanceAxios.defaults.headers.Authorization = `Bearer${token}`;
        set((state)=> ({
          ...state,
          token: token,
          error: null,
          usuario: usuario,
          isAuthenticated: true
        }))
      } catch (error: any) {
        set((state)=> ({
          ...state,
          isLoading: false,
          isAuthenticated: false
        }))
        throw new Error(error.message)
      }finally{
        set((state)=>({
          ...state,
          isLoading: false
        }))
      }
    },
    onLogout: ()=> {
      instanceAxios.defaults.headers.Authorization = null;
      set({
        usuario: null,
        isAuthenticated: false,
        token: null
      })
    },
    initialize: () => {
      const token = get().token
      const usuario = get().usuario
      if (token) {
      if (usuario) {
        instanceAxios.defaults.headers.Authorization = `Bearer ${token}`;
        set({
          isAuthenticated: true,
          usuario: usuario
        })
        return token
      }
      return null
    }
    }
  }), 
  {
    name: 'auth-store',
    partialize: (state)=> ({
      token: state.token,
      usuario: state.usuario,
      isAuthenticated: state.isAuthenticated
    })
  }
))



