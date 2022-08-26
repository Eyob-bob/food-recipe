import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navbar from "../components/navbar";
import Card from "../components/card";
import useLoggedOut from "../custom-hooks/useLoggedOut";

export default function MyRecipes() {
  const isLoading = useLoggedOut();

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
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
