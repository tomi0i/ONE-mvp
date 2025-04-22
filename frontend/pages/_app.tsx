import "@/styles/globals.css";
import "highlight.js/styles/github-dark.css";
import { Toaster } from "sonner";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google"; 

const inter = Inter({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className + " bg-slate-50 min-h-screen"}>
      <Component {...pageProps} />
      <Toaster richColors position="top-right" />
    </main>
  );
}