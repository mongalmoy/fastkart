import ViewProductPage from "@/page/viewproduct/ViewProductPage";
import "@/styles/app/viewproduct/shop.css";
import { Suspense } from "react";

export default function ViewProduct() {
  return (
    <Suspense fallback={<div>View product page is loading...</div>}>
      <ViewProductPage />
    </Suspense>
  );
}