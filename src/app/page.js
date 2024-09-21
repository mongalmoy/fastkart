import Navigationbar from "@/components/NavigationBar/navigationbar";
import Homepage from "@/pages/homepage/homepage";

export default function Home() {
  return (
    <>
      <Navigationbar />
      <div className="page_body">
        <Homepage />
      </div>
    </>
  );
}
