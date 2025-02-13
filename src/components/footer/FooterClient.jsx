"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer";

const FooterClient = () => {
  const pathname = usePathname();
  return pathname !== "/login" && pathname !== "/register" ? (
    <Footer />
  ) : (
    <div className="footer_replaced"></div>
  );
};

export default FooterClient;
