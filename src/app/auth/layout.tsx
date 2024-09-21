import Image from "next/image";
import background from "@/assets/background.png";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen justify-center">
      <div className="hidden sm:block flex-1">
        <Image
          src={background}
          alt=""
          width={600}
          height={700}
          quality={100}
          className="h-full max-h-screen w-full object-cover"
        />
      </div>
      <div className="sm:flex-1">{children}</div>
    </div>
  );
}
