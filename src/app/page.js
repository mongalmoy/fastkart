import Navigationbar from "@/components/NavigationBar/navigationbar";
import HomePage from "@/page/homepage/homepage";

export default function Home() {
  return (
    <>
      <Navigationbar />
      <div className="page_body">
        <HomePage />
      </div>
    </>
  );
}