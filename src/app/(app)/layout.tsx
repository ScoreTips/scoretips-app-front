import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scoretips - Inicio",
  description: "Scoretips - Inicio",
};

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="mx-[100px] mt-[24px]">{children}</main>
    </>
  );
}
