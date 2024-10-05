import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { type PropsWithChildren } from "react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { NavBar } from "./navbar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <main
        className={`flex min-h-screen flex-col  bg-pokemon-landscape bg-cover ${inter.className}`}
      >
        <NavBar />
        {children}
      </main>
    </>
  );
}
