"use client";
import { useRouter } from "next/navigation";
import { fetchWrapper } from "@/utils/fetchWrapper";
import { useForm, SubmitHandler } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { KeyboardEvent } from "react";
import Link from "next/link";

type Inputs = {
  email: string;
  password: string;
  name: string;
};

export function SignUpForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await fetchWrapper("auth/register", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      toast({
        variant: "sucess",
        title: "Sucesso!",
        description: (
          <div className="text-success-foreground">Cadastro realizado</div>
        ),
      });

      router.push("/auth/singin");
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Ops!",
        description: (
          <div className="text-destructive-foreground">{error?.message}</div>
        ),
      });
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    const key = e.code;
    if (key === "Enter") {
      handleSubmit(onSubmit);
    }
  };

  return (
    <div className="w-full space-y-4">
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8">
          <label
            htmlFor="text"
            className="block text-sm font-semibold text-gray-800"
          >
            Nome
          </label>
          <input
            type="text"
            className="mt-2 block w-full rounded-md border bg-white px-4 py-3 text-gray-400 focus:border-green-600 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-40"
            placeholder="Digite seu e-mail"
            {...register("name", { required: true })}
            onKeyDown={handleKeyPress}
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-800"
          >
            Email
          </label>
          <input
            type="email"
            className="mt-2 block w-full rounded-md border bg-white px-4 py-3 text-gray-400 focus:border-green-600 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-40"
            placeholder="Digite seu e-mail"
            {...register("email", { required: true })}
            onKeyDown={handleKeyPress}
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-800"
          >
            Senha
          </label>
          <input
            type="password"
            className="mt-2 block w-full rounded-md border bg-white px-4 py-3 text-gray-400 focus:border-green-600 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-40"
            placeholder="Digite sua senha"
            {...register("password", { required: true })}
            onKeyDown={handleKeyPress}
          />
        </div>

        <div className="mt-6">
          <Button type="submit" className="w-full" variant="primary">
            Entrar
          </Button>
        </div>
        <div className="mt-[15px] flex justify-center">
          <p className="text-black">
            Já tem uma conta?{" "}
            <Link href="/auth/signin">
              <span className="text-green-600">Entre Agora</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
