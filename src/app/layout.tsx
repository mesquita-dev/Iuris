import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { MeetingRequestsProvider } from "@/contexts/MeetingRequestsContext";
import { UserProvider } from "@/contexts/UserContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Iuris",
    template: "%s | Iuris",
  },
  description: "Iuris - Sistema de gestão jurídica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${playfairDisplay.variable} font-sans antialiased`}
      >
        <UserProvider>
          <MeetingRequestsProvider>
            <Header />
            <main className="p-6 bg-gray-100">
              {children}
            </main>
          </MeetingRequestsProvider>
        </UserProvider>
      </body>
    </html>
  );
}
