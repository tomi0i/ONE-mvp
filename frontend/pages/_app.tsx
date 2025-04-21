import "@/styles/globals.css";
import "highlight.js/styles/github-dark.css";
import { Toaster } from "sonner";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster richColors position="top-right" />
    </>
  );
}