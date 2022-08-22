import Head from "next/head";
import Link from "next/link";
import { TextField, Button } from "@mui/material";

const signin = () => {
  function handleSignin(e) {
    e.preventDefault();
  }

  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      <div className="h-screen border grid place-content-center w-screen">
        <form
          onSubmit={handleSignin}
          className="flex flex-col gap-4 w-[70vw] sm:w-[50vw] md:w-[30vw]"
        >
          <TextField id="email" variant="outlined" label="Email" type="email" />

          <TextField
            id="password"
            variant="outlined"
            label="Password"
            type="password"
          />

          <TextField
            id="confirm_password"
            variant="outlined"
            label="Confirm Password"
            type="password"
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
