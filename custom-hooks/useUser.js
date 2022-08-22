import { useRouter } from "next/router";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";

const useUser = () => {
  const user = useSelector((state) => state.user.user);
  const router = useRouter();

  useLayoutEffect(() => {
    if (user.accessToken) {
      router.push("/");
    }
  });

  return user;
};

export default useUser;
