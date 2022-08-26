import { useRouter } from "next/router";
import React, { useLayoutEffect, useState } from "react";
import useUser from "./useUser";

const useLoggedIn = () => {
  const router = useRouter();
  const user = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    if (user.accessToken) router.push("/");
    else setIsLoading(false);
  }, []);

  return isLoading;
};

export default useLoggedIn;
