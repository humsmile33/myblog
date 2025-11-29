import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "My Static Blog",
  description: "A beautiful static blog built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-12 px-6">
          <div className="max-w-4xl mx-auto w-full">
            {children}
          </div>
        </main>
        <footer className="py-8 text-center text-slate-500 text-sm border-t border-slate-200 dark:border-slate-800">
          © {new Date().getFullYear()} MyBlog. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
