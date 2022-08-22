import Head from "next/head";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useReducer, useState } from "react";
import { useRouter } from "next/router";
import instance from "../../lib/axiosConfig.js";

function reducer(state, action) {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "verify_password":
      return { ...state, verifyPassword: action.payload };
    default:
      throw new Error();
  }
}

const initialState = {
  name: "",
  email: "",
  password: "",
  verifyPassword: "",
};

const signup = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleSignup(e) {
    e.preventDefault();
    if (state.password != state.verifyPassword) {
      setOpen(true);
      setMessage("Password doesn't match with confirm password");
    } else {
      let data;
      try {
        data = await instance.post("auth/signup", {
          name: state.name,
          email: state.email,
          password: state.password,
        });
        if (data.status == 200) {
          router.push(`verify/${state.email}`);
        }
      } catch (err) {
        setOpen(true);
        setMessage(err.response.data);
      }
    }
  }
  function handleClose() {
    setOpen(false);
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
        <title>Signup</title>
      </Head>
      <div className="h-screen border grid place-content-center w-screen">
        <form
          className="flex flex-col gap-4 w-[70vw] sm:w-[50vw] md:w-[30vw]"
          onSubmit={handleSignup}
        >
          <TextField
            id="name"
            variant="outlined"
            label="Name"
            value={state.name}
            onChange={(e) => {
              dispatch({ type: "name", payload: e.target.value });
            }}
          />

          <TextField
            id="email"
            variant="outlined"
            label="Email"
            type="email"
            value={state.email}
            onChange={(e) => {
              dispatch({ type: "email", payload: e.target.value });
            }}
          />

          <TextField
            id="password"
            variant="outlined"
            label="Password"
            type="password"
            value={state.password}
            onChange={(e) => {
              dispatch({ type: "password", payload: e.target.value });
            }}
          />

          <TextField
            id="confirm_password"
            variant="outlined"
            label="Confirm Password"
            type="password"
            value={state.verifyPassword}
            onChange={(e) => {
              dispatch({ type: "verify_password", payload: e.target.value });
            }}
          />

          <Button
            variant="contained"
            className="text-white bg-blue-600 capitalize"
            type="submit"
          >
            Sign Up
          </Button>
        </form>
        <p className="text-center mt-4">
          Have an account?{" "}
          <Button variant="text" className="capitalize">
            <Link href="signin">
              <a className="font-bold">Sign In</a>
            </Link>
          </Button>
        </p>
      </div>
    </>
  );
};

export default signup;
