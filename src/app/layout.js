import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Header from "@/components/header/header";
import Navigationbar from "@/components/NavigationBar/navigationbar";
import WrapperContext from "@/components/context/WrapperContext";

const LazyFooter = lazy(() => import("@/components/footer/footer"));

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
          <Navigationbar />
          <div className="page_body">{children}</div>
          <ErrorBoundary>
            <Suspense fallback={<div>Footer is loading...</div>}>
              <LazyFooter />
            </Suspense>
          </ErrorBoundary>
        </WrapperContext>
      </body>
    </html>
  );
}
