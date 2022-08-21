import { useRouter } from "next/router";
import React, { useEffect } from "react";
import jwt from "jsonwebtoken";
import instance from "../../../lib/axiosConfig";

const verify = ({ accessToken, refreshToken }) => {
  const router = useRouter();

  useEffect(() => {
    const accToken = jwt.decode(accessToken, process.env.ACCESS_TOKEN_SECRET);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    if (accToken.verified) {
      router.push("/");
    }
  });

  return (
    <div>An Email sent to your account please verify and refresh this page</div>
  );
};

export async function getServerSideProps(context) {
  const token = await instance.post("auth/user", {
    email: context.params.email,
  });
  console.log();
  return {
    props: {
      accessToken: token.data._doc.access_token,
      refreshToken: token.data._doc.refresh_token,
    },
  };
}

export default verify;
