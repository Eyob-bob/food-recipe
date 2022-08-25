import Head from "next/head";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Navbar from "../components/navbar";
import { useState } from "react";
import { Alert, IconButton, Snackbar, Stack } from "@mui/material";
import Trash from "@mui/icons-material/Delete";

const createrecipes = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [fields, setFields] = useState({
    name: "",
    calories: "",
    time: "",
    numOfPersons: "",
    ingrident: "",
    step: "",
  });

  const [ingridents, setIngridents] = useState([]);
  const [steps, setSteps] = useState([]);

  function handleClose() {
    setOpen(false);
  }
  function handleSubmit(e) {
    e.preventDefault();
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
        <title>Create Recipes</title>
      </Head>
      <div>
        <Navbar />
        <div className="h-screen border grid place-content-center w-screen">
          <form
            onSubmit={handleSubmit}
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
                    ingridents.map((ingrident) => (
                      <p>
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
                    steps.map((step) => (
                      <p>
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
              Create
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default createrecipes;
