import Navigationbar from "@/components/NavigationBar/navigationbar";
import dynamic from "next/dynamic";

const LazyHomepage = dynamic(() => import("@/page/homepage/homepage"), {
  ssr: false,
})

export default function Home() {
  return (
    <>
      <Navigationbar />
      <div className="page_body">
        <LazyHomepage />
      </div>
    </>
  );
}
