import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import FavoriteOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import Favorite from "@mui/icons-material/Favorite";
import Bookmark from "@mui/icons-material/Bookmark";
import Navbar from "../../components/navbar";
import {
  Alert,
  Avatar,
  Button,
  IconButton,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import interceptAxios from "../../lib/axiosUserConfig";
import useUser from "../../custom-hooks/useUser";
import jwt from "jsonwebtoken";
import { useDispatch } from "react-redux";
import { login } from "../../redux-slices/userSlice";
import instance from "../../lib/axiosConfig";
import BookmarkAddOutlined from "@mui/icons-material/BookmarkAddOutlined";
import useLoggedOut from "../../custom-hooks/useLoggedOut";

const Food = () => {
  const router = useRouter();
  const isLoading = useLoggedOut();
  const [recipe, setRecipe] = useState({});
  const [ingrident, setIngrident] = useState([]);
  const [step, setStep] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [fav, setFav] = useState({});
  const [book, setBook] = useState({});
  const [comment, setComment] = useState("");
  const [allComment, setAllComment] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const user = useUser();
  const dispatch = useDispatch();

  function handleClose() {
    setOpen(false);
  }

  async function getOneRecipe(id) {
    const data = (
      await interceptAxios.get(`/recipe/getAuthenticatedOne/${id}`, {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      })
    ).data;
    setRecipe(data.recipe);
    setIngrident(data.ingrident.name);
    setStep(data.step.name);
    setIsFetching(false);
    setFav(data.fav);
    setBook(data.book);
    setAllComment(data.comment);
  }

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
      console.log(err);
      //   throw Error("Error Occured");
    }
  }

  interceptAxios.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      const decodedToken = jwt.decode(localStorage.getItem("accessToken"));

      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        config.headers["authorization"] = "Bearer " + data;
      }

      return config;
    },
    (err) => Promise.reject(err)
  );

  useEffect(() => {
    if (router.query.foodId) {
      getOneRecipe(router.query.foodId);
    }
  }, [router.query]);

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
      <Head>
        <title>Detail Page</title>
      </Head>
      <div>
        <Navbar />
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <div className="min-h-screen max-w-[1024px] mx-auto flex justify-center">
            <div className="max-w-max mt-16 shadow-sm px-[8vw] flex flex-col lg:flex-row gap-4 justify-center lg:items-start items-center">
              <div className="border-gray-700 border-4 rounded-lg">
                <div className="relative h-[50vh] w-[80vw] lg:w-[40vw] ">
                  <Image src={recipe.photo} layout="fill" objectFit="cover" />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h5 className="font-extrabold text-xl text-center">
                  {recipe.name}
                </h5>
                <div className="w-[70vw] lg:w-[40vw] flex flex-col gap-2 justify-center items-center">
                  <h5 className="font-bold text-lg text-center">Ingridents</h5>

                  <ul className="grid grid-cols-2 gap-x-10">
                    {ingrident.map((ing, index) => {
                      return <li key={index}>* {ing}</li>;
                    })}{" "}
                  </ul>
                </div>
                <div className="w-[70vw] lg:w-[40vw] flex flex-col gap-2 justify-center items-center">
                  <h5 className="font-bold text-lg text-center">Steps</h5>

                  <ol className="grid grid-cols-2 gap-x-10">
                    {step.map((s, i) => {
                      return (
                        <li key={i}>
                          Step {++i}) {s}
                        </li>
                      );
                    })}
                  </ol>
                </div>
                <div className="flex justify-center gap-4">
                  <div>
                    Add To Favorite
                    <IconButton
                      onClick={async () => {
                        try {
                          const favorite = (
                            await interceptAxios.post(`/recipe/favorite`, fav, {
                              headers: {
                                authorization: `Bearer ${user.accessToken}`,
                              },
                            })
                          ).data.fav;

                          setFav(favorite);
                        } catch (err) {
                          console.log(err);
                        }
                      }}
                    >
                      {"  "}
                      {fav.isFav ? <Favorite /> : <FavoriteOutlined />}
                    </IconButton>
                  </div>
                  <div>
                    Add To Bookmark
                    <IconButton
                      onClick={async () => {
                        try {
                          const bookmark = (
                            await interceptAxios.post(
                              `/recipe/bookmark`,
                              book,
                              {
                                headers: {
                                  authorization: `Bearer ${user.accessToken}`,
                                },
                              }
                            )
                          ).data.book;

                          setBook(bookmark);
                        } catch (err) {
                          console.log(err);
                        }
                      }}
                    >
                      {book.isBook ? <Bookmark /> : <BookmarkAddOutlined />}
                    </IconButton>
                  </div>
                </div>

                <div className="flex gap-2 justify-center">
                  <TextField
                    variant="outlined"
                    label="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button
                    variant="outlined"
                    onClick={async () => {
                      if (comment == "") {
                        setOpen(true);
                        setMessage("Fill The open Comment input");
                        return;
                      }
                      try {
                        const allComments = (
                          await interceptAxios.post(
                            `/recipe/comment`,
                            { id: router.query.foodId, comment },
                            {
                              headers: {
                                authorization: `Bearer ${user.accessToken}`,
                              },
                            }
                          )
                        ).data.allComment;

                        setAllComment(allComments);
                        setComment("");
                      } catch (err) {
                        console.log(err);
                      }
                    }}
                  >
                    Post
                  </Button>
                </div>
                <div className="flex flex-col gap-4">
                  <p>Comments</p>
                  {allComment.map((com) => {
                    return (
                      <div key={com._id} className="flex flex-col gap-2">
                        <div className="flex items-center gap-1">
                          <Avatar>{com.name[0]}</Avatar>
                          <p className="text-gray-600">{com.name}</p>
                        </div>
                        <p>{com.comment}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Food;
