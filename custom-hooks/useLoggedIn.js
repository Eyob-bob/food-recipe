import { useRouter } from "next/router";
import React, { useLayoutEffect } from "react";
import useUser from "./useUser";

const useLoggedIn = () => {
  const router = useRouter();
  const user = useUser();

  useLayoutEffect(() => {
    if (user.accessToken) {
      router.push("/");
    }
  }, [user.accessToken]);

  return user;
};

export default useLoggedIn;
