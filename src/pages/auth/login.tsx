import { ButtonComponent } from "@/components/button";
import { InuptComponent } from "@/components/input";
import React, { useContext, useState } from "react";
import logo from "../../assets/images/logo-policia.png";
import imageBarco from "../../assets/images/foto-barco.jpg";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../../context/auth-context";

const loginUserSchema = z.object({
  username: z.string().nonempty("o campo user name e obrogatorio"),
  password: z
    .string()
    .nonempty("o campo senha e obrigatorio")
    .min(6, "a senha precisa ter no minimo 6 caracters"),
});

export function Login() {
  const { handleLogin } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(loginUserSchema),
  });
  async function handleData(data: any) {
    console.log(data);
    handleLogin("http://localhost:3333/api/v1/usuario/login", data);
  }
  return (
    <div
      className="w-screen h-screen  flex flex-row justify-between"
      style={{ backgroundColor: "#DBDBDB" }}
    >
      <aside className="flex flex-1 items-center ">
        <img
          src={imageBarco}
          alt="logo-policial"
          title="logo-da-pagina"
          style={{ width: "900px", height: "714px" }}
          className="ml-30 rounded-2xl"
        />
      </aside>

      <section className=" flex-1 justify-items-center content-center">
        <div
          className="bg-white ml-50 rounded-2xl justify-items-center py-10 gap-2 py-10 "
          style={{ width: "653px", height: "860px" }}
        >
          <div className=" flex flex-col items-center">
            <img
              src={logo}
              alt="logo-policial"
              title="logo-da-pagina"
              style={{ width: "100px", height: "114px" }}
            />
            <h1 className=" text-3xl mt-5">BATALHÃO DE POLICIA NAVAL </h1>
            <h1 className="text-3xl">DE ANGOLA</h1>
            <h2 className="text-xl mt-5">
              Insira as suas credências para acessar ao sistema
            </h2>
          </div>

          <div className="">
            <form
              onSubmit={handleSubmit(handleData)}
              method="post"
              className="mt-10 justify-items-end "
            >
              <div>
                <label htmlFor="username" className="font-bold">
                  Username
                </label>

                <InuptComponent
                  register={register("username")}
                  type="text"
                  placeHolder="Digite o seu username"
                  width="522px"
                  height="54px"
                />
                {errors.username && (
                  <span className="mb-100">{errors.username.message}</span>
                )}
                <label htmlFor="senha" className="font-bold mt-10">
                  Senha
                </label>
                <InuptComponent
                  register={register("password")}
                  type="password"
                  placeHolder="Digite a sua senha"
                  width="522px"
                  height="54px"
                />
                {errors.senha && (
                  <span className="mb-10">{errors.senha.message}</span>
                )}
              </div>
              <p className="text-gray-500">Esqueceste a senha?</p>

              <ButtonComponent
                type="submit"
                buttonColor="#6B7A31"
                label="Entrar"
                size={{ width: "522px", height: "53px" }}
                textColor="#fff"
              />
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
