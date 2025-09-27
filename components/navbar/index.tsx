"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Link } from "next-view-transitions";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { IconMenu } from "@tabler/icons-react";
import { Container } from "../container";

const Navbar = () => {
  const navItems = [
    { title: "About", href: "/about" },
    { title: "Projects", href: "/projects" },
    { title: "Blogs", href: "/blog" },
    { title: "Contact", href: "/contact" },
  ];

  const [hovered, setHovered] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 100], [0, 10]);
  const width = useTransform(scrollY, [0, 100], ["860px", "792px"]);

  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  return (
    <div className="relative mx-auto h-full w-full max-w-4xl bg-white dark:bg-neutral-900">
      <Container>
        <motion.nav
          style={{
            boxShadow: scrolled ? "var(--shadow-aceternity)" : "none",
            width,
            y,
          }}
          transition={{ duration: 0.3, ease: "linear" }}
          className={`fixed inset-x-0 top-0 z-50 mx-auto hidden max-w-4xl items-center justify-between rounded-full py-2 backdrop-blur-sm md:flex ${
            scrolled ? "px-2" : ""
          }`}
        >
          <Link href="/">
            <Image
              src="/avatar.png"
              height={100}
              width={100}
              alt="Avatar"
              className="h-10 w-10 rounded-full"
            />
          </Link>

          <div className="flex items-center space-x-2">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                className="relative px-2 py-1 text-sm"
              >
                {hovered === idx && (
                  <motion.span
                    layoutId="hovered-highlight"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 40,
                    }}
                    className="absolute inset-0 rounded-md bg-neutral-100/100 dark:bg-neutral-800"
                  />
                )}
                <span className="relative z-10">{item.title}</span>
              </Link>
            ))}
          </div>
        </motion.nav>

        <div className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between bg-white px-4 py-3 shadow-md lg:hidden dark:bg-neutral-900">
          <Link href="/">
            <Image
              src="/avatar.png"
              height={100}
              width={100}
              alt="Avatar"
              className="h-9 w-9 rounded-full"
            />
          </Link>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-1"
            aria-label="Toggle Menu"
          >
            <IconMenu size={26} />
          </button>
        </div>

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed right-0 left-0 z-40 mx-auto w-full max-w-4xl rounded-xl bg-white/80 p-4 shadow-md backdrop-blur-md md:hidden dark:bg-neutral-800/80"
          >
            <div className="mt-14 space-y-2 px-4 py-3 text-center md:hidden">
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded px-2 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                  <motion.span
                    initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                      delay: idx * 0.1,
                    }}
                    layoutId="hovered-span-mobile"
                  >
                    {item.title}
                  </motion.span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </Container>
    </div>
  );
};

export default Navbar;
