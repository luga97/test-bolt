import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

export function NavBar() {
  const router = useRouter();
  const isActive = (pathname: string) => router.pathname === pathname;
  const routes = [
    {
      path: "/",
      title: "Inicio",
    },
    {
      path: "/pokedex",
      title: "Pokedex",
    },
  ];
  return (
    <nav className="flex h-32 w-full flex-col items-center justify-center gap-4 bg-[#000000B2] ">
      <Image
        alt="logo pokemon"
        src="/img/pokemon-logo.png"
        width={100}
        height={100}
      />
      <ul className="flex items-center justify-center gap-10 text-lg text-white">
        {routes.map((r) => (
          <li
            key={r.path}
            className={`cursor-pointer ${
              isActive(r.path) && "font-semibold underline"
            }`}
          >
            <Link href={r.path}>{r.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
