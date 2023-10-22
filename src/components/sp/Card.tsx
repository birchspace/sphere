"use client";

import React from "react";
import Image from "next/image";
import Parcel from "~/components/sp/Parcel";
import heroMina from "public/images/hero.webp";

import { useProgram } from "~/context/ProgramContext";

export function SpCard() {
  const { userName } = useProgram();
  console.log(userName, "by userName");

  return (
    <section className="w-full snap-y snap-mandatory overflow-y-auto">
      <Parcel name={userName} description="description">
        <Image
          fill
          src={heroMina}
          alt="Original Mina artwork by wxsonz."
          className="object-cover"
          quality={90}
          property="blur"
          blurDataURL={heroMina.blurDataURL}
        />
      </Parcel>
    </section>
  );
}
