import { SignInForm } from "@/components/auth/signInForm";
import { Separator } from "@/components/ui/separator";

export default function SignInPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="p-[40px] sm:p-0 flex w-96 flex-col items-center justify-center space-y-5">
        <h1 className="text-2xl font-semibold text-green-600">Bem vindo!</h1>
        <p className="text-center text-muted-foreground">
          Coloque suas informações abaixo para entrar no ambiente da plataforma.
        </p>

        <Separator />

        <SignInForm />
      </div>
    </div>
  );
}
