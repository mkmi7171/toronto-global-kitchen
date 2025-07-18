"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex gap-4">
      <Link href="/" className={pathname === "/" ? "text-blue-600" : ""}>
        Home
      </Link>
      <Link
        href="/about"
        className={pathname === "/about" ? "text-blue-600" : ""}
      >
        About
      </Link>
    </nav>
  );
};
