import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navbar from "../components/navbar";
import Card from "../components/card";

export default function Home() {
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
      </div>
    </>
  );
}
