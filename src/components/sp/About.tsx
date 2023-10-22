"use client";

import Image from "next/image";
import { useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import * as Accordion from "@radix-ui/react-accordion";
import { useProgram } from "~/context/ProgramContext";
import { ListItem } from "~/components/sp/ListItem";
import HeroMina from "public/images/hero.webp";
import { jumpLink, shortenAddress } from "~/utils";
import { ProgramAccount } from "@project-serum/anchor/dist/cjs/program";
import { motion } from "framer-motion";

export function About() {
  const [highlighted, setHighlighted] = useState("");
  const [contant, setContant] = useState("");
  const [describe, setDescribe] = useState("");
  const { addConfession, userConfessions, isLoading } = useProgram();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContant(e.target.value);
  };

  const handleDescribeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescribe(e.target.value);
  };

  const handleStat = async () => {
    const res = await addConfession(contant, describe);
    console.log(res, "by res");
  };

  return (
    <section className="container h-screen grid-cols-2 items-center justify-center gap-20 lg:grid lg:grid-cols-8">
      <div className="relative col-span-3 mx-auto flex w-full justify-end rounded-md">
        <div className="absolute z-10 h-full w-full">
          <div
            className={`absolute right-[7%] top-[3%] aspect-square w-[40%] rounded-full border-4 border-green drop-shadow-md ${
              highlighted === "band"
                ? "sopacity-100 scale-100 backdrop-brightness-[140%]"
                : "scale-50 opacity-0"
            } origin-center duration-250 ease-out`}
          />
          <div
            className={`absolute left-[32%] top-[7%] aspect-square w-[20%] rounded-full border-4 border-green drop-shadow-md ${
              highlighted === "ahoge"
                ? "sopacity-100 scale-100 backdrop-brightness-[140%]"
                : "scale-50 opacity-0"
            } origin-center duration-250 ease-out`}
          />
          <div
            className={`absolute left-[14%] top-[44%] aspect-square w-[19%] rounded-full border-4 border-green drop-shadow-md ${
              highlighted === "accessories"
                ? "sopacity-100 scale-100 backdrop-brightness-[140%]"
                : "scale-50 opacity-0"
            } origin-center duration-250 ease-out`}
          />
          <div
            className={`absolute right-[29%] top-[43.5%] aspect-square w-[19%] rounded-full border-4 border-green drop-shadow-md ${
              highlighted === "accessories"
                ? "sopacity-100 scale-100 backdrop-brightness-[140%]"
                : "scale-50 opacity-0"
            } origin-center duration-250 ease-out`}
          />
          <div
            className={`absolute right-[24.5%] top-[33.6%] aspect-square w-[8%] rounded-full border-4 border-green drop-shadow-md ${
              highlighted === "accessories"
                ? "sopacity-100 scale-100 backdrop-brightness-[140%]"
                : "scale-50 opacity-0"
            } origin-center duration-250 ease-out`}
          />
          <div
            className={`absolute right-[33%] top-[59.7%] aspect-square w-[15%] rounded-full border-4 border-green drop-shadow-md ${
              highlighted === "leaf"
                ? "sopacity-100 scale-100 backdrop-brightness-[140%]"
                : "scale-50 opacity-0"
            } origin-center duration-250 ease-out`}
          />
        </div>
        <Image
          src={HeroMina}
          alt=""
          priority
          className={`${
            highlighted === "" ? "brightness-100" : "brightness-75"
          } rounded-md duration-200`}
          style={{
            height: "auto",
            width: "90%",
          }}
        />
      </div>

      <Accordion.Root
        type="single"
        defaultValue="lore"
        className=" flex flex-col justify-center lg:col-span-5"
      >
        <Accordion.Item value="lore">
          <Accordion.Trigger className="in-out-custom w-full text-left font-display text-2xl font-semibold capitalize text-neutral-50 duration-400 data-[state=open]:py-6 data-[state=closed]:pt-6 data-[state=open]:text-3xl md:text-3xl data-[state=open]:md:text-4xl">
            Create
          </Accordion.Trigger>
          <Accordion.Content className="gap-2 overflow-hidden data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down">
            <Input
              type="text"
              label="Describe"
              placeholder="Enter describe"
              labelPlacement="outside"
              onChange={handleDescribeInput}
              endContent={
                <div className="pointer-events-none flex items-center">
                  <motion.div
                    drag
                    dragConstraints={{
                      top: -50,
                      left: -50,
                      right: 50,
                      bottom: 50,
                    }}
                    className="text-small text-default-400"
                  >
                    😊
                  </motion.div>
                </div>
              }
            />
            <Textarea
              required
              variant="faded"
              label="Don't worry, your secret is safe with us 🤫"
              labelPlacement="outside"
              placeholder="Enter your content"
              className="col-span-12 mb-6 md:col-span-6 md:mb-0"
              onChange={handleInput}
            />
            <Button
              color="default"
              className="mt-4"
              onClick={handleStat}
              isLoading={isLoading}
            >
              Star
            </Button>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="design">
          <Accordion.Trigger className="in-out-custom w-full text-left font-display text-2xl font-semibold capitalize text-neutral-50 duration-400 data-[state=open]:py-6 data-[state=closed]:pt-6 data-[state=open]:text-3xl md:text-3xl data-[state=open]:md:text-4xl">
            my list
          </Accordion.Trigger>
          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down">
            {userConfessions.length > 0 ? (
              <div
                className="grid gap-3 sm:grid-cols-2"
                onMouseLeave={() => setHighlighted("")}
              >
                {userConfessions.map((con: ProgramAccount, i: number) => {
                  const { publicKey, account } = con;
                  const { authority, confession } = account;
                  const strAuthority = authority.toString();
                  const strPublicKey = publicKey.toString();
                  const highlightList = [
                    "leaf",
                    "accessories",
                    "ahoge",
                    "band",
                  ];
                  const highlightIndex = i % 5;
                  return (
                    <ListItem
                      text={confession}
                      highlighted={highlighted}
                      herf={jumpLink(strPublicKey)}
                      setHighlighted={setHighlighted}
                      value={highlightList[highlightIndex]!}
                      heading={shortenAddress(strPublicKey)}
                      key={`${strAuthority}-${confession}-${i}`}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="grid gap-3 text-xl capitalize sm:grid-cols-2">
                not found
              </div>
            )}
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </section>
  );
}
