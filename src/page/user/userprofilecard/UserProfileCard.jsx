import "@/styles/page/user/userprofilecard/UserProfileCard.css";
import Image from "next/image";
import Link from "next/link";

import { AiOutlineBars } from "react-icons/ai";
import { MdOutlinePayment } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { FaCircleUser } from "react-icons/fa6";
import { MdAutoDelete } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import LogoutButton from "./LogoutButton";

const menuList = [
  { icon: <AiOutlineBars />, name: "My Orders", href: "orders" },
  // { icon: <MdOutlinePayment />, name: "Pay Online", href: "payment" },
  { icon: <RiEdit2Fill />, name: "Edit Account", href: "edit" },
  { icon: <FaCircleUser />, name: "Change Password", href: "change-password" },
  { icon: <MdAutoDelete />, name: "Delete Account", href: "delete" },
  { icon: <IoMdLogOut />, name: "Logout", href: "logout" },
];

const UserProfileCard = () => {

  return (
    <div className="card-container userProfileCard">
      <Image
        src={"/assets/img/user/user_photo.jpg"} // Replace with your image URL
        alt="User Profile"
        className="profile-image"
        height={100}
        width={100}
        loading="lazy"
      />
      <h2 className="user-name">Mongalmoy Karmakar</h2>
      <ul className="menu-list">
        {menuList.map((el, ind) => {
          if(el.name?.toLocaleLowerCase()==="logout"){
            return <LogoutButton key={ind} el={el} ind={ind} />
          }
          return (
            <Link
              key={ind}
              className="menu-item"
              href={"/my-account/" + el.href}
            >
              {el.icon}
              <span>{el.name}</span>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default UserProfileCard;
