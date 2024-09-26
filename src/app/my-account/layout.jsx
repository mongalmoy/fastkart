import "@/styles/app/my-account/myaccount.css";
import Pageflow from "@/components/pageflow/pageflow";
import UserProfileCard from "@/page/user/userprofilecard/UserProfileCard";

export default function RootLayout({ children }) {
  return (
    <div className="page_body">
      <Pageflow />
      <div className="my_account_layout">
        <div className="my_account_left">
          <UserProfileCard />
        </div>
        <div className="my_account_right">{children}</div>
      </div>
    </div>
  );
}
