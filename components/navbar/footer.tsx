import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import { Container } from "../container";

const Footer = () => {
  return (
    <Container className="flex justify-between border-t border-neutral-200 px-10 py-3 dark:border-neutral-800">
      <p className="text-xs text-neutral-500">Built by Deepak Bhatter</p>
      <div className="flex items-center justify-center gap-4">
        <Link
          href="https://peerlist.io/deepak_bhatter"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            className="size-4 text-neutral-500 hover:text-neutral-600"
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            >
              <path d="M8.87 3h6.26a6 6 0 0 1 5.963 5.337l.21 1.896c.131 1.174.131 2.36 0 3.534l-.21 1.896A6 6 0 0 1 15.13 21H8.87a6 6 0 0 1-5.963-5.337l-.21-1.896a16 16 0 0 1 0-3.534l.21-1.896A6 6 0 0 1 8.87 3" />
              <path d="M9 17v-4m0 0V7h4a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3z" />
            </g>
          </svg>
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/deepak-bhatter5512/"
        >
          <IconBrandLinkedin className="size-4 text-neutral-500 hover:text-neutral-600" />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/deepak5512"
        >
          <IconBrandGithub className="size-4 text-neutral-500 hover:text-neutral-600" />
        </Link>
      </div>
    </Container>
  );
};

export default Footer;
