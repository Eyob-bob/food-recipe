import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Card from "../components/card";
import instance from "../lib/axiosConfig";
import instanceUser from "../lib/axiosUserConfig";
import { useDispatch } from "react-redux";
import { login } from "../redux-slices/userSlice";
import axios from "axios";
import jwt from "jsonwebtoken";
import useUser from "../custom-hooks/useUser";

export default function Home(recipes) {
  // const [recipes, setRecipes] = useState([]);
  // const [ingridents, setIngridents] = useState([]);
  // const [steps, setSteps] = useState([]);
  // const [isFetching, setIsFetching] = useState(true);
  // const user = useUser();

  // async function fetchAllRecipe() {
  //   const allRecipe = (await instance.get("/recipe/getAll")).data;
  //   setRecipes(allRecipe.allRecipe);
  //   setSteps(allRecipe.allStep);
  //   setIngridents(allRecipe.allIngrident);
  //   setIsFetching(false);
  // }

  // useEffect(() => {
  //   fetchAllRecipe();
  // }, []);

  return (
    <>
      <Head>
        <title>Home page</title>
      </Head>
      <div>
        <Navbar />
        <div className="min-h-screen w-screen max-w-[1024px] mx-auto flex justify-center">
          <div className=" w-full mt-14 shadow-sm px-10">
            <div className="relative h-[40vh] w-full border text-center ">
              <h1 className="absolute z-30 text-3xl font-extrabold text-white left-0 right-0 top-[50%]">
                Food Recipes
              </h1>
              <Image src="/images/bg.jpg" layout="fill" objectFit="cover" />
            </div>
            <div className="flex flex-col justify-center items-center border">
              <h2 className="text-2xl font-extrabold my-10">All Dishes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4">
                {recipes.recipes.map((recipe) => (
                  <Card
                    key={recipe._id}
                    name={recipe.name}
                    time={recipe.timeInMin}
                    calories={recipe.calories}
                    person={recipe.numOfPersons}
                    photo={recipe.photo}
                    id={recipe._id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const allRecipe = (await instance.get("/recipe/getAll")).data;
  return {
    props: { recipes: allRecipe.allRecipe },
  };
}
