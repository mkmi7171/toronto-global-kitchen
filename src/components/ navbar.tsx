"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { BsCart } from 'react-icons/bs';
import { useRef, useState, useEffect } from "react";
import CartModal from "@/app/cart";

export const Navbar = () => {
  const pathname = usePathname();
  const cartRef = useRef<HTMLButtonElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    if (showModal && cartRef.current) {
      const rect = cartRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.bottom + 10, 
        left: rect.left - 200 + rect.width,
      });
    }
  }, [showModal]);

  return (
    <nav className="flex justify-between px-24 py-5">
      <div className="flex gap-10">
        <Link href="/" className={pathname === "/" ? "text-blue-600" : ""}>
          Home
        </Link>
        <Link
          href="/about"
          className={pathname === "/about" ? "text-blue-600" : ""}
        >
          About
        </Link>
      </div>

      <div className="relative">
        <button ref={cartRef} onClick={toggleModal}>
          <BsCart className="w-6 h-6" />
        </button>

        {showModal && (
          <CartModal onClose={toggleModal} position={modalPosition} />
        )}
      </div>
    </nav>
  );
};
