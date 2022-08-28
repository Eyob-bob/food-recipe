import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useUser from "./useUser";

const useLoggedIn = () => {
  const router = useRouter();
  const user = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user.accessToken) router.push("/");
    else setIsLoading(false);
  }, [user.accessToken]);

  return isLoading;
};

export default useLoggedIn;
