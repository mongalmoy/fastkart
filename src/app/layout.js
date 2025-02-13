import "@/styles/globals.css";

import { Inter } from "next/font/google";
import Header from "@/components/header/header";
import WrapperContext from "@/components/context/WrapperContext";
import FooterNavigation from "@/components/FooterNavigation/FooterNavigation";
import FooterClient from "@/components/footer/FooterClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fastkart",
  description: "An ecommerce website developed by Mongalmoy Karmakar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WrapperContext>
          <Header />
          {children}
          <FooterClient />
        </WrapperContext>
        <FooterNavigation />
      </body>
    </html>
  );
}
