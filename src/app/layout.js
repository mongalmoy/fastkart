import "@/styles/globals.css";

import { Inter } from "next/font/google";
import Header from "@/components/header/header";
import WrapperContext from "@/components/context/WrapperContext";
import dynamic from "next/dynamic";
import FooterNavigation from "@/components/FooterNavigation/FooterNavigation";
import Footer from "@/components/footer/footer";

// const LazyFooter = dynamic(() => import("@/components/footer/footer"), {
//   loading: () => <div>Footer is loading...</div>,
//   ssr: false,
// });

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
          <Footer />
        </WrapperContext>
        <FooterNavigation />
      </body>
    </html>
  );
}
