import Head from "next/head";
import Image from "next/image";
import React from "react";
import FavoriteOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import BookmarkOutlined from "@mui/icons-material/BookmarkAddOutlined";
import Navbar from "../components/navbar";
import { Avatar, Button, IconButton, TextField } from "@mui/material";

const Food = () => {
  return (
    <>
      <Head>
        <title>Detail Page</title>
      </Head>
      <div>
        <Navbar />
        <div className="min-h-screen max-w-[1024px] mx-auto flex justify-center">
          <div className="max-w-max mt-16 shadow-sm px-[8vw] flex flex-col gap-4 items-center">
            <div className="border-gray-700 border-4 rounded-lg">
              <div className="relative h-[50vh] w-[80vw] ">
                <Image src="/images/bg.jpg" layout="fill" objectFit="cover" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h5 className="font-extrabold text-xl text-center">
                Fresh and Health Salad
              </h5>
              <div className="w-[70vw] flex flex-col gap-2 justify-center items-center">
                <h5 className="font-bold text-lg text-center">Ingridents</h5>

                <ul className="grid grid-cols-2 gap-x-10">
                  {[
                    "Egg",
                    "Egg",
                    "Chakra UI vs Material Ui",
                    "Egg",
                    "Egg",
                    "Bro how are you",
                    "Egg",
                  ].map((ing) => {
                    return <li>* {ing}</li>;
                  })}
                </ul>
              </div>
              <div className="w-[70vw] flex flex-col gap-2 justify-center items-center">
                <h5 className="font-bold text-lg text-center">Steps</h5>

                <ol className="grid grid-cols-2 gap-x-10 border">
                  {[
                    "Egg",
                    "Egg",
                    "Chakra UI vs Material Ui",
                    "Egg",
                    "Egg",
                    "Egg",
                    "Egg",
                  ].map((ing, i) => {
                    return (
                      <li>
                        Step {++i}) {ing}
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

              <div className="flex gap-2 justify-center border">
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
      </div>
    </>
  );
};

export default Food;
