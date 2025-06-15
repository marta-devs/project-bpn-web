import { ButtonComponent } from "@/components/button";
import { InuptComponent } from "@/components/input";
import React from "react";
import logo from "../../assets/images/logo-policia.png";
import imageBarco from "../../assets/images/foto-barco.jpg";
export default function Login() {
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
            <h1 className=" text-3xl mt-10">BATALHÃO DE POLICIA NAVAL </h1>
            <h1 className="text-3xl">DE ANGOLA</h1>
            <h2 className="text-xl mt-5">
              Insira as suas credências para acessar ao sistema{" "}
            </h2>
          </div>

          <div className="justify-items-end ">
            <form action="" method="post" className="mt-10">
              <p className="font-bold">Username</p>

              <InuptComponent
                name="username"
                placeHolder="Digite o seu username"
                width="522px"
                height="54px"
              />
              <p className="font-bold">Senha</p>
              <InuptComponent
                name="username"
                placeHolder="Digite a sua senha"
                width="522px"
                height="54px"
              />
            </form>
            <p>Esqueceste a senha?</p>
          </div>
          <ButtonComponent
            type="submit"
            buttonColor="#6B7A31"
            label="Entrar"
            size={{ width: "522px", height: "53px" }}
            textColor="#fff"
          />
        </div>
      </section>
    </div>
  );
}
