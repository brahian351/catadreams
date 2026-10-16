import type { Metadata } from "next";
import { Cinzel, Kaushan_Script, Montserrat } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";
import ButterflyRain from "@/components/ButterflyRain";


const cinzel = Cinzel({subsets: ["latin"], variable: "--font-cinzel"});
const kaushan = Kaushan_Script({subsets: ["latin"], weight: "400", variable: "--font-kaushan"});
const montserrat = Montserrat({subsets: ["latin"], variable: "--font-montserrat"});

export const metadata: Metadata = {
  title: "Cata Dreams 🦋",
  description: "Ropa, accesorios, Vehículos, tatuajes y personalizaciones únicas. Tu estilo, tu identidad",
};

export default function RootLayout({children} : {children : React.ReactNode}){
  return (
    <html lang="es">
        <body className={`${cinzel.variable} ${kaushan.variable} ${montserrat.variable} bg-bg font-body antialiased`}>
            <ButterflyRain />
            <Header />
            {children}
            <footer className="border-t border-line py-8 text-center text-sm text-zinc-500">
                Cata Dreams &#129419;, &#xA9; {new Date().getFullYear()} Todos los derechos reservados.
            </footer>
        </body>
    </html>
  )
}
