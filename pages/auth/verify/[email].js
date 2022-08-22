import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect } from "react";
import jwt from "jsonwebtoken";
import instance from "../../../lib/axiosConfig";
import { useDispatch } from "react-redux";
import { login } from "../../../redux-slices/userSlice";
import { Button } from "@mui/material";

const verify = ({ accessToken, refreshToken }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const accToken = jwt.decode(accessToken, process.env.ACCESS_TOKEN_SECRET);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    if (accToken.verified) {
      dispatch(login());
      router.push("/");
    }
  }, []);

  return (
    <>
      <div>
        An Email sent to your account please verify and refresh this page
      </div>
      Didn't get the code?
      <Button
        variant="outlined"
        onClick={async () => {
          console.log(router.query.email);
          await instance.post("/auth/resend", { email: router.query.email });
        }}
      >
        Resend
      </Button>
    </>
  );
};

export async function getServerSideProps(context) {
  const token = await instance.post("auth/user", {
    email: context.params.email,
  });
  return {
    props: {
      accessToken: token.data._doc.access_token,
      refreshToken: token.data._doc.refresh_token,
    },
  };
}

export default verify;
