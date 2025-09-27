import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ViewTransitions } from "next-view-transitions";
import Footer from "@/components/navbar/footer";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Deepak Bhatter",
    template: "%s - Deepak Bhatter",
  },
  description:
    "A portfolio website that showcases me as a Full Stack & AI Engineer.",
  openGraph: {
    title: "Deepak Bhatter - A Full Stack Developer",
    description:
      "A portfolio website that showcases me as a Full Stack Developer & AI Engineer.",
    url: "https://www.deepakbhatter.com/",
    siteName: "Deepak Bhatter",
    images: [
      {
        url: "https://www.deepakbhatter.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Deepak Bhatter - Full Stack Developer | AI Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deepak Bhatter",
    description:
      "A portfolio website that showcases me as a Full Stack & AI Engineer.",
    images: ["https://www.deepakbhatter.com/opengraph-image.png"],
    creator: "Deepak Bhatter",
  },
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "Deepak Bhatter",
    "Full Stack Developer",
    "Portfolio",
    "React Developer",
    "Next.js Developer",
    "DevOps Engineer",
    "IIT Jodhpur Graduate",
    "AI Engineer",
    "ML Engineer",
    "Frontend Developer",
    "Backend Developer",
  ],
  authors: [{ name: "Deepak Bhatter" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} bg-neutral-100 antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster position="top-center" />
            <Navbar />
            <div
              className={
                "relative bg-[linear-gradient(to_right,#4f4f4f14_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f14_1px,transparent_1px)] bg-[size:40px_40px]"
              }
            >
              {children}
              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
