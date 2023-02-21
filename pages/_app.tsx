import MyMenu from "@/components/menu";
import "@/styles/globals.css";
import { Center, ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider>
        <MyMenu />

        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
