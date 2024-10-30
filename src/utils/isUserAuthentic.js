"use client";

import { apis } from "@/lib/constants";
import { setIsLoggedIn } from "@/react-redux/slices/users/userSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function IsUserAuthentic() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const checkAuth = await axios.get(apis.SERVER_BASE_URL + "api/login");

        dispatch(setIsLoggedIn(checkAuth.data?.isLoggedIn));
      } catch (error) {
        console.log(error);
        dispatch(setIsLoggedIn(false));
      }
    })();
  }, []);
  return null;
}
