import Head from "next/head";
import Link from "next/link";
// import { TextField, Button, Snackbar, Alert } from "@mui/material";
import instance from "../../lib/axiosConfig";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { login } from "../../redux-slices/userSlice";
import { useDispatch } from "react-redux";
import useUser from "../../custom-hooks/useUser";

const signin = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  useUser();

  function handleClose() {
    setOpen(false);
  }

  async function handleSignin(e) {
    e.preventDefault();

    try {
      const data = await (
        await instance.post("/auth/signin", { ...state })
      ).data;

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      dispatch(login());
      console.log(data);
    } catch (err) {
      setOpen(true);
      setMessage(err.response.data);
    }
  }

  return (
    <>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      </Stack>

      <Head>
        <title>Signin</title>
      </Head>
      <div className="h-screen border grid place-content-center w-screen">
        <form
          onSubmit={handleSignin}
          className="flex flex-col gap-4 w-[70vw] sm:w-[50vw] md:w-[30vw]"
        >
          <TextField
            id="email"
            variant="outlined"
            label="Email"
            type="email"
            value={state.email}
            onChange={(e) => {
              setState({ ...state, email: e.target.value });
            }}
          />

          <TextField
            id="password"
            variant="outlined"
            label="Password"
            type="password"
            value={state.password}
            onChange={(e) => {
              setState({ ...state, password: e.target.value });
            }}
          />

          <Button
            type="submit"
            variant="contained"
            className="text-white bg-blue-600 capitalize"
          >
            Sign In
          </Button>
        </form>
        <p className="text-center mt-4">
          Doesn't have an account?{" "}
          <Button variant="text" className="capitalize">
            <Link href="signup">
              <a className="font-bold">Sign Up</a>
            </Link>
          </Button>
        </p>
      </div>
    </>
  );
};

export default signin;
