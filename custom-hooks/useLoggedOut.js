import { useRouter } from "next/router";
import React, { useLayoutEffect } from "react";
import useUser from "./useUser";

const useLoggedOut = () => {
  const router = useRouter();
  const user = useUser();

  useLayoutEffect(() => {
    if (!user.accessToken) {
      router.push("/auth/signin");
    }
  }, [user.accessToken]);

  return user;
};

export default useLoggedOut;
