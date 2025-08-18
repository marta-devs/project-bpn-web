import { BaseHookQuery } from '@/hooks/base-hook-query';
import type { Usuario } from '@/interfaces/usuario';
import * as z from "zod"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"

const baseHookQuery = new BaseHookQuery<Usuario>('users');

const formUserSchema = z.object({
  username: z.string().trim().nonempty(),
  funcao: z.string().trim().nonempty(),
})

type FormUserData = z.infer<typeof formUserSchema>

export function Example() {
  const { mutate, isPending } = baseHookQuery.useCreate('/user');
  const { data: usuarios } = baseHookQuery.useGetByAll('/user');
  const {register, handleSubmit, formState: {errors} } = useForm<FormUserData>({
    mode: "all",
    resolver: zodResolver(formUserSchema)
  })

  const onSubmit = (data: any) => {
    mutate(data, {
      onSuccess: ()=> {
        alert('Usuário criado com sucesso!')
      }
    })
  }

  return (
    <div>
      Example
    </div>
  );
}
