import "./myaccount.css";
import Pageflow from "@/components/pageflow/pageflow";
import UserProfileCard from "@/components/user/userprofilecard/UserProfileCard";

export default function RootLayout({ children }) {
  return (
    <div>
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
