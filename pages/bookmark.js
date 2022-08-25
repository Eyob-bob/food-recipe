import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navbar from "../components/navbar";

export default function Bookmark() {
  return (
    <>
      <Head>
        <title>Bookmark page</title>
      </Head>
      <div>
        <Navbar />
        <div className="min-h-screen border flex justify-center">
          <div className="max-w-max mt-20">
            <h1 className="text-2xl font-extrabold mb-10">
              Your Bookmark Dishes
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Link href="/jfslkjf">
                <div className="w-60 flex flex-col justify-center items-center gap-4 rounded-md bg-gray-100 pb-2 hover:scale-105 cursor-pointer transition-all shadow-md">
                  <div className="relative h-32 w-full">
                    <Image
                      src="/vercel.svg"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <h5 className="font-extrabold text-lg">
                    Fresh and Health Salad
                  </h5>
                  <p className="text-gray-600 text-md">60 calories</p>
                  <div className="border w-[90%]"></div>
                  <div className="flex gap-8">
                    <div className="flex flex-col gap-1">
                      <p className="text-gray-600 text-md">Time</p>
                      <p className="text-sm">5 min</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-gray-600 text-md">Portion</p>
                      <p className="text-sm">3 person</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
