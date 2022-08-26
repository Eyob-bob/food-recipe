import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import FavoriteOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import BookmarkOutlined from "@mui/icons-material/BookmarkAddOutlined";
import Navbar from "../components/navbar";
import { Avatar, Button, IconButton, TextField } from "@mui/material";
import { useRouter } from "next/router";
import instance from "../lib/axiosConfig";

const Food = () => {
  const router = useRouter();
  const [recipe, setRecipe] = useState({});
  const [ingrident, setIngrident] = useState([]);
  const [step, setStep] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  async function getOneRecipe(id) {
    const data = (await instance.get(`/recipe/getOne/${id}`)).data;
    setRecipe(data.recipe);
    setIngrident(data.ingrident.name);
    setStep(data.step.name);
    setIsFetching(false);
  }

  useEffect(() => {
    if (router.query.foodId) {
      getOneRecipe(router.query.foodId);
    }
  }, [router.query]);

  return (
    <>
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
                    {console.log(ingrident)}
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
                    <IconButton>
                      {"  "}
                      <FavoriteOutlined />
                    </IconButton>
                  </div>
                  <div>
                    Add To Bookmark
                    <IconButton>
                      <BookmarkOutlined />
                    </IconButton>
                  </div>
                </div>

                <div className="flex gap-2 justify-center">
                  <TextField variant="outlined" label="comment" />
                  <Button variant="outlined">Post</Button>
                </div>
                <div className="flex flex-col gap-4">
                  <p>Comments</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      <Avatar>E</Avatar>
                      <p className="text-gray-600">Eyob Abebe</p>
                    </div>
                    <p>That is Cool!</p>
                  </div>
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
