import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import useLoggedOut from "../custom-hooks/useLoggedOut";
import instanceUser from "../lib/axiosUserConfig";
import useUser from "../custom-hooks/useUser";
import interceptAxios from "../lib/axiosUserConfig";
import jwt from "jsonwebtoken";
import Card from "../components/card";
import { useDispatch } from "react-redux";
import { login } from "../redux-slices/userSlice";
import instance from "../lib/axiosConfig";

export default function MyRecipes() {
  const isLoading = useLoggedOut();
  const [isFetching, setIsFetching] = useState(true);
  const user = useUser();
  const [recipes, setRecipes] = useState([]);
  const dispatch = useDispatch();

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
      const decodedToken = jwt.decode(user.accessToken);

      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        config.headers["authorization"] = "Bearer " + data;
      }

      return config;
    },
    (err) => Promise.reject(err)
  );

  async function fetchMyRecipes() {
    try {
      const recipe = (
        await interceptAxios.get("recipe/myRecipes", {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        })
      ).data;
      setRecipes(recipe.recipe);
      setIsFetching(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchMyRecipes();
  }, [user.accessToken]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Head>
        <title>MyRecipes page</title>
      </Head>
      <div>
        <Navbar />
        <div className="min-h-screen border flex justify-center">
          <div className="flex flex-col justify-center items-center border mt-14">
            <h2 className="text-2xl font-extrabold my-10">Your Recipes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4">
              {isFetching ? (
                <p>Loading...</p>
              ) : (
                recipes?.map((recipe) => (
                  <Card
                    key={recipe._id}
                    name={recipe.name}
                    calories={recipe.calories}
                    time={recipe.timeInMin}
                    person={recipe.numOfPerson}
                    photo={recipe.photo}
                    id={recipe._id}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
