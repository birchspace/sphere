"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Caret } from "~/components/Caret";
import { NavItem } from "~/components/NavItem";
import { useProgram } from "~/context/ProgramContext";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { NavMenuContent, NavMenuTrigger, NavMenuViewport } from "~/config";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import NoSSR from "./NoSSR";

export function Navigation() {
  const Pages = [
    {
      link: "/",
      title: "Home",
      strings: "Start of sphere",
    },
    {
      link: "/playground",
      title: "Playground",
      strings: "Venture into the realm of the written word",
    },
  ];

  const { authority } = useProgram();

  const Self = {
    link: `/sp/${authority}`,
    title: "HomePage",
    strings: `${authority}`,
  };

  const [navBackground, setNavBackground] = React.useState(true);

  const hideNavBackground = () => {
    if (window.scrollY >= 1) {
      setNavBackground(false);
    } else {
      setNavBackground(true);
    }
  };

  React.useEffect(() => {
    hideNavBackground();
    window.addEventListener("scroll", hideNavBackground);
  });

  return (
    <div
      className={`fixed z-[999] w-full ${
        !navBackground && "shadow-[0_6px_22px_#11111166]"
      } duration-300`}
    >
      <div className="container flex h-16 items-center">
        <div
          className={`absolute inset-0 z-0 border-b ${
            navBackground
              ? "border-transparent ease-out"
              : "linear border-neutral-50/10 backdrop-blur-xl backdrop-brightness-[40%] backdrop-contrast-[91.5%]"
          } duration-300`}
        />
        <Link href="/" className="z-50 my-auto mr-auto pl-3 md:pl-6">
          <motion.div
            initial={{ x: -400 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 90 }}
            className="flex cursor-pointer items-center"
          >
            <svg
              className="slg:w-12 w-9 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{
                  pathLength: 1,
                  transition: { delay: 1.6, duration: 1.2 },
                }}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></motion.path>
            </svg>
            <h3 className="slg:text-2xl ml-2 text-xl font-semibold capitalize text-white">
              sphere
            </h3>
          </motion.div>
        </Link>
        <NavigationMenu.Root
          className="relative flex justify-center"
          delayDuration={0}
        >
          <NavigationMenu.List className="flex py-3 pr-6">
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className={NavMenuTrigger}>
                Public
                {Caret}
              </NavigationMenu.Trigger>

              <NavigationMenu.Content
                className={`${NavMenuContent} w-[500px] lg:w-[600px]`}
              >
                <ul className="grid grid-flow-row grid-cols-2">
                  {Pages.map((Page) => (
                    <NavItem
                      key={Page.link}
                      href={Page.link}
                      title={Page.title}
                      description={Page.strings}
                    />
                  ))}
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Trigger className={NavMenuTrigger}>
                Self
                {Caret}
              </NavigationMenu.Trigger>

              <NavigationMenu.Content className={`${NavMenuContent} w-[300px]`}>
                <ul className="grid w-full grid-flow-row">
                  <NavItem
                    href={Self.link}
                    title={Self.title}
                    description={Self.strings}
                  />
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Indicator className="top-12 -z-10 flex h-3 items-end justify-center transition-transform duration-250 ease-out data-[state='hidden']:animate-fade-out data-[state='visible']:animate-fade-in">
              <div className="relative -top-2 h-10 w-full rounded-lg bg-neutral-50/10" />
            </NavigationMenu.Indicator>
          </NavigationMenu.List>
          <div
            className="absolute right-6 top-[63px] flex justify-center"
            style={{ perspective: 2000 }}
          >
            <NavigationMenu.Viewport className={NavMenuViewport} />
          </div>
        </NavigationMenu.Root>
        <NoSSR>
          <WalletMultiButton
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
              height: "10px",
              padding: "4px",
              color: "rgba(209, 213, 219, 0.8)",
              fontWeight: "500",
              borderRadius: "0.375rem",
              transitionDuration: "250ms",
            }}
            className="!group !hover:bg-red-900"
          />
        </NoSSR>
      </div>
    </div>
  );
}
