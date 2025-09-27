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
import { Container } from "../container";

const Navbar = () => {
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
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
