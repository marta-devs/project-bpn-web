import { BaseHookQuery } from "@/hooks/base-hook-query";
import type { Usuario } from "@/interfaces/usuario";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const baseHookQuery = new BaseHookQuery<Usuario>("users");

const formUserSchema = z.object({
  username: z.string().trim().nonempty(),
  funcao: z.string().trim().nonempty(),
});

type FormUserData = z.infer<typeof formUserSchema>;

export function Home() {
  const { mutate, isPending } = baseHookQuery.useCreate("/user");
  const { data: usuarios } = baseHookQuery.useGetByAll("/user");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormUserData>({
    mode: "all",
    resolver: zodResolver(formUserSchema),
  });

  const onSubmit = (data: any) => {
    mutate(data, {
      onSuccess: () => {
        alert("Usuário criado com sucesso!");
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("username")}
          placeholder="Digite o seu nickname..."
        />
        <input
          type="text"
          {...register("funcao")}
          placeholder="Digite o seu nickname..."
        />

        <button type="submit">{isPending ? "Loading..." : "Enviar"}</button>
      </form>
      <div>
        <h1>ola mundo</h1>
      </div>
    </div>
  );
}
