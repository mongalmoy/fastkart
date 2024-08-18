import Pageflow from "@/components/pageflow/pageflow";

export default function RootLayout({ children }) {
  return (
    <div>
      <Pageflow />
      {children}
    </div>
  );
}
