"use client";

import { apis } from "@/lib/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const LogoutButton = ({el, ind}) => {
  const route = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get(apis.SERVER_BASE_URL + "/api/logout");
      route.push("/login"); // Redirect to the login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <a
      key={ind}
      className="menu-item"
      // href={"/my-account/" + el.href}
      onClick={() => {
        Swal.fire({
          icon: "question",
          text: "Do you want to logout?",
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            handleLogout();
          }
        });
      }}
    >
      {el.icon}
      <span>{el.name}</span>
    </a>
  );
};

export default LogoutButton;
