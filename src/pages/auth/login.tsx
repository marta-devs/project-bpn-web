import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import logo from "../../assets/images/logo-bpn.png";
import imageBarco from "../../assets/images/foto-barco.jpg";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../../context/auth-context";
import { useContext } from "react";
import { InputComponent } from "@/components/layouts/input-component";

const images = [imageBarco]; // Adicione mais imagens se quiser

const loginUserSchema = z.object({
  username: z.string().nonempty("O campo username e obrigatório"),
  password: z
    .string()
    .nonempty("O campo senha e obrigatorio")
    .min(6, "A senha precisa ter no minimo 6 caracters"),
});

export function Login() {
  const { handleLogin, isLoading } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(loginUserSchema),
  });

  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(images.length);

  useEffect(() => {
    if (!carouselApi) return;
    setTotalItems(carouselApi.scrollSnapList().length);
    setCurrentIndex(carouselApi.selectedScrollSnap());
    const onSelect = () => setCurrentIndex(carouselApi.selectedScrollSnap());
    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  async function handleData(data: any) {
    handleLogin("http://localhost:3333/api/v1/usuario/login", data);
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-row">
      <div className="absolute inset-0 z-0">
        <Carousel setApi={setCarouselApi} className="w-full h-full">
          <CarouselContent>
            {images.map((img, idx) => (
              <CarouselItem key={typeof img === 'string' ? img : `carousel-item-${idx}`}>
                <img
                  src={img}
                  alt={`Imagem ${idx + 1}`}
                  className="object-cover w-full h-full min-h-screen min-w-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-white" />
          <CarouselNext className="text-white" />
        </Carousel>
        
        <div className="absolute inset-0 bg-black/50" />
   
        <div className="w-full absolute bottom-8 z-20 flex items-center justify-center">
          {images.map((img, idx) => (
            <button
              key={typeof img === 'string' ? img : `dot-${idx}`}
              type="button"
              className={`w-8 h-1 rounded-md border border-white transition-all duration-200 ${
                currentIndex === idx ? "bg-white" : "bg-white/40 border-none"
              }`}
              onClick={() => carouselApi?.scrollTo(idx)}
              aria-label={`Ir para imagem ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      
      <section className="absolute z-10 inset-0 flex items-center justify-end pr-32">
        <div className="bg-white/95 rounded-2xl h-[97vh] shadow-2xl w-full max-w-md pt-6 p-10 flex flex-col items-center backdrop-blur-md border border-gray-200">
          <div className="flex flex-col gap-2 items-center mb-8">
            <img
              src={logo}
              alt="logo-policial"
              className="w-18 h-18 mb-2"
            />
            <h1 className="text-lg font-semibold text-center">BATALHÃO DE POLICIA NAVAL DE ANGOLA</h1>
            <p className="text-gray-500 text-center text-sm mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
         
          <form
            onSubmit={handleSubmit(handleData)}
            method="post"
            className="w-full flex flex-col gap-2"
          >
            <InputComponent
              className="h-12"
              placeholder="Digite o seu username"
              label="Username"
              id="username"
              error={errors.username}
              {...register('username')}
            />
             
            <InputComponent
              className="h-12"
              placeholder="Digite a sua Senha"
              label="Senha"
              id="password"
              error={errors.password}
              {...register('password')}
            />
            
            <div className="flex justify-end mb-2">
              <span className="text-sm text-gray-500 hover:underline">Esqueceste-te a senha?</span>
            </div>
            <Button
              disabled={isLoading}
              className="w-full h-12 bg-[#6B7A31] text-white font-semibold rounded-md disabled:bg-gray-400 shadow-md cursor-pointer"
              type="submit"
            >
              {!isLoading ? "Entrar" : "..."}
            </Button>
          </form>
          <p className="text-gray-400 text-xs mt-8 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </section>
    </div>
  );
}
