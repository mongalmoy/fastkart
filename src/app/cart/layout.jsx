import Navigationbar from "@/components/NavigationBar/navigationbar";
import Pageflow from "@/components/pageflow/pageflow";

export default function RootLayout({ children }) {
  return (
    <>
      <Navigationbar />
      <div className="page_body">
        <div>
          <Pageflow />
          {children}
        </div>
      </div>
    </>
  );
}
