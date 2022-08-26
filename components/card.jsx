import Image from "next/image";
import Link from "next/link";
import React from "react";

const card = ({ name, calories, time, person, photo, id }) => {
  return (
    <Link href={`/${id}`}>
      <div className="w-60 flex flex-col justify-center items-center gap-4 rounded-md bg-gray-100 pb-2 hover:scale-105 cursor-pointer transition-all shadow-md">
        <div className="relative h-32 w-full">
          <Image
            src={`${photo}`}
            layout="fill"
            objectFit="cover"
            className="rounded-tl-md rounded-tr-md"
          />
        </div>
        <h5 className="font-extrabold text-lg">{name}</h5>
        <p className="text-gray-600 text-md">{calories} calories</p>
        <div className="border w-[90%]"></div>
        <div className="flex gap-8">
          <div className="flex flex-col gap-1">
            <p className="text-gray-600 text-md">Time</p>
            <p className="text-sm">{time} min</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-gray-600 text-md">Portion</p>
            <p className="text-sm">{person} person</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default card;
