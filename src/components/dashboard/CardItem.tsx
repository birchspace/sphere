"use client";

import React from "react";
import Link from "next/link";
import { random } from "node-emoji";
import { shortenAddress, jumpLink } from "~/utils";
import { Tooltip, Avatar, Chip } from "@nextui-org/react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface CardItem {
  index: number;
  describe: string;
  authority: string;
  publicKey: string;
  confession: string;
}

export function CardItem({
  index,
  describe,
  authority,
  publicKey,
  confession,
}: CardItem) {
  const emoji = random().emoji;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <div
      onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }}
      className="group relative flex flex-col items-center rounded-xl border border-zinc-800  bg-zinc-950 px-6 py-4"
    >
      <div className="absolute right-5 top-0 h-px w-full bg-gradient-to-l from-transparent via-primary/30 via-10% to-transparent" />
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative flex w-full flex-col ">
        {confession.length > 72 ? (
          <Tooltip
            color="default"
            className="leading-7 max-w-sm break-all p-6 tracking-wide"
            content={confession}
          >
            <div className="flex h-36 w-full items-center justify-center rounded-lg text-3xl">
              {emoji}
            </div>
          </Tooltip>
        ) : (
          <motion.figure
            className="flex h-36 w-full items-center justify-center rounded-lg"
            initial={{ opacity: 0.6 }}
            whileHover={{
              scale: 1.2,
              transition: { duration: 1 },
            }}
            whileTap={{ scale: 0.9 }}
            whileInView={{ opacity: 1 }}
          >
            <div className="group-hover:hidden">
              {describe ? describe : <span className="text-3xl">{emoji}</span>}
            </div>
            <p className="hidden break-all group-hover:block group-hover:p-6">
              {confession}
            </p>
          </motion.figure>
        )}
        <div className="flex flex-wrap mt-3 gap-6 text-xs">
          <Link href={jumpLink(authority)}>
            <Chip
              variant="flat"
              avatar={
                <Avatar
                  name="a"
                  size="sm"
                  getInitials={(name) => name.charAt(0)}
                />
              }
            >
              {shortenAddress(authority)}
            </Chip>
          </Link>
          <Link href={jumpLink(publicKey)}>
            <Chip
              variant="flat"
              avatar={
                <Avatar
                  name="p"
                  size="sm"
                  getInitials={(name) => name.charAt(0)}
                />
              }
            >
              {shortenAddress(publicKey)}
            </Chip>
          </Link>
        </div>
      </div>
    </div>
  );
}
