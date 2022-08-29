import Head from "next/head";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Navbar from "../components/navbar";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  CircularProgress,
  IconButton,
  Snackbar,
  Stack,
} from "@mui/material";
import Trash from "@mui/icons-material/Delete";
import instance from "../lib/axiosConfig";
import useLoggedOut from "../custom-hooks/useLoggedOut";
import useUser from "../custom-hooks/useUser";
import { useDispatch } from "react-redux";
import { login } from "../redux-slices/userSlice";
import jwt from "jsonwebtoken";
import interceptAxios from "../lib/axiosUserConfig";
import jwtDecode from "jwt-decode";

const Createrecipes = () => {
  const isLoading = useLoggedOut();
  const [isSaving, setIsSaving] = useState(false);
  const user = useUser();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [fields, setFields] = useState({
    name: "",
    calories: "",
    time: "",
    numOfPersons: "",
    ingrident: "",
    step: "",
    photo: "",
  });

  const [ingridents, setIngridents] = useState([]);
  const [steps, setSteps] = useState([]);
  const fileRef = useRef(null);

  async function refreshToken() {
    try {
      const refresh = (
        await instance.post("auth/refresh", {
          refreshToken: user.refreshToken,
        })
      ).data;
      localStorage.setItem("accessToken", refresh.accessToken);
      dispatch(login());

      return refresh.accessToken;
    } catch (err) {
      throw Error("Error Occured");
    }
  }

  interceptAxios.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      const decodedToken = jwtDecode(user.accessToken);

      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        config.headers["authorization"] = "Bearer " + data;
      }

      return config;
    },
    (err) => Promise.reject(err)
  );

  function handleClose() {
    setOpen(false);
  }
  function handleSuccessClose() {
    setSuccessOpen(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!fields.name) {
      setOpen(true);
      setMessage("Name is required");
      return;
    }
    if (!fields.calories) {
      setOpen(true);
      setMessage("calories is required");
      return;
    }
    if (!fields.time) {
      setOpen(true);
      setMessage("time is required");
      return;
    }
    if (!fields.numOfPersons) {
      setOpen(true);
      setMessage("numOfPersons is required");
      return;
    }
    if (ingridents.length == 0) {
      setOpen(true);
      setMessage("Ingridents is required");
      return;
    }
    if (steps.length == 0) {
      setOpen(true);
      setMessage("steps is required");
      return;
    }
    if (steps.length == 0) {
      setOpen(true);
      setMessage("steps is required");
      return;
    }
    if (fields.photo.length == 0) {
      setOpen(true);
      setMessage("Photo is required");
      return;
    }

    setIsSaving(true);

    const formData = new FormData();
    formData.append("name", fields.name);
    formData.append("photo", fields.photo);
    formData.append("numOfPersons", fields.numOfPersons);
    formData.append("time", fields.time);
    formData.append("calories", fields.calories);
    formData.append("ingridents", ingridents);
    formData.append("steps", steps);

    let data;
    try {
      data = (
        await interceptAxios.post("/recipe/add", formData, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "content-type": "multipart/form-data",
          },
        })
      ).data;

      setIsSaving(false);

      if (data) {
        setSuccessOpen(true);
        setSuccessMessage("Recipe Created Successfully");

        fileRef.current.value = null;

        setFields({
          name: "",
          calories: "",
          time: "",
          numOfPersons: "",
          ingrident: "",
          step: "",
          photo: "",
        });

        setIngridents([]);
        setSteps([]);
      }
    } catch (err) {
      setIsSaving(false);
      setOpen(true);
      setMessage(err.message);
    }
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      </Stack>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={successOpen}
          autoHideDuration={2000}
          onClose={handleSuccessClose}
        >
          <Alert
            onClose={handleSuccessClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {successMessage}
          </Alert>
        </Snackbar>
      </Stack>
      <Head>
        <title>Create Recipes</title>
      </Head>
      <div>
        <Navbar />
        <div className="h-screen border grid place-content-center w-screen">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="flex flex-col justify-center items-center gap-6 w-[70vw]"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-2 ">
                <TextField
                  variant="outlined"
                  label="Name"
                  type="text"
                  value={fields.name}
                  onChange={(e) =>
                    setFields((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />

                <TextField
                  variant="outlined"
                  label="Calories"
                  type="number"
                  step="any"
                  value={fields.calories}
                  onChange={(e) =>
                    setFields((prev) => ({
                      ...prev,
                      calories: e.target.value,
                    }))
                  }
                />
                <TextField
                  variant="outlined"
                  label="Time in min"
                  type="number"
                  step="any"
                  value={fields.time}
                  onChange={(e) =>
                    setFields((prev) => ({
                      ...prev,
                      time: e.target.value,
                    }))
                  }
                />
                <TextField
                  variant="outlined"
                  label="Num of Persons"
                  type="number"
                  value={fields.numOfPersons}
                  onChange={(e) =>
                    setFields((prev) => ({
                      ...prev,
                      numOfPersons: e.target.value,
                    }))
                  }
                />
                <TextField
                  variant="outlined"
                  type="file"
                  name="photo"
                  ref={fileRef}
                  onChange={(e) =>
                    setFields((prev) => ({
                      ...prev,
                      photo: e.target.files[0],
                    }))
                  }
                />
              </div>

              <div className="flex flex-col md:flex-row gap-2 w-fit">
                <div>
                  <div className="flex justify-center">
                    <TextField
                      variant="outlined"
                      label="Ingridents"
                      type="text"
                      value={fields.ingrident}
                      onChange={(e) =>
                        setFields((prev) => ({
                          ...prev,
                          ingrident: e.target.value,
                        }))
                      }
                    />
                    <Button
                      onClick={() => {
                        if (!fields.ingrident) return;
                        setIngridents((prev) => [...prev, fields.ingrident]);
                        setFields((prev) => ({ ...prev, ingrident: "" }));
                      }}
                      className="h-14"
                      variant="text"
                    >
                      Add
                    </Button>
                  </div>
                  {ingridents.length == 0 ? (
                    <p className="text-red-500">No Ingridents Added</p>
                  ) : (
                    ingridents.map((ingrident, i) => (
                      <p key={i}>
                        {ingrident}
                        <IconButton
                          onClick={() => {
                            setIngridents((prev) => [
                              ...prev.filter((p) => p != ingrident),
                            ]);
                          }}
                        >
                          <Trash className="text-red-600" />
                        </IconButton>
                      </p>
                    ))
                  )}
                </div>

                <div>
                  <div className="flex justify-center w-fit">
                    <TextField
                      variant="outlined"
                      label="Steps"
                      type="text"
                      value={fields.step}
                      onChange={(e) =>
                        setFields((prev) => ({
                          ...prev,
                          step: e.target.value,
                        }))
                      }
                    />
                    <Button
                      onClick={() => {
                        if (!fields.step) return;
                        setSteps((prev) => [...prev, fields.step]);
                        setFields((prev) => ({ ...prev, step: "" }));
                      }}
                      className="h-14"
                      variant="text"
                    >
                      Add
                    </Button>
                  </div>
                  {steps.length == 0 ? (
                    <p className="text-red-600">No steps Added</p>
                  ) : (
                    steps.map((step, i) => (
                      <p key={i}>
                        {step}
                        <IconButton
                          onClick={() => {
                            setSteps((prev) => [
                              ...prev.filter((p) => p != step),
                            ]);
                          }}
                        >
                          <Trash className="text-red-600" />
                        </IconButton>
                      </p>
                    ))
                  )}
                </div>
              </div>
            </div>
            <Button
              type="submit"
              variant="contained"
              className="text-white bg-blue-600 capitalize w-[30%] "
            >
              {"Create"}
            </Button>
            {isSaving && <CircularProgress />}
          </form>
        </div>
      </div>
    </>
  );
};

export default Createrecipes;
