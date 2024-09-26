import Navigationbar from "@/components/NavigationBar/navigationbar";
import HomePage from "@/page/HomePage/HomePage";

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
