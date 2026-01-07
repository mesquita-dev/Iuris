import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agenda",
};

export default function AgendaPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <h1 className="font-sans text-2xl font-bold text-base-black">Agenda</h1>
    </div>
  );
}

