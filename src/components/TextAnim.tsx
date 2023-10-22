"use client";

import React from "react";
import { CursorBlinker } from "./CursorBlinker";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export function TextAnim({ children }: { children: string }) {
  const count = useMotionValue(0);
  const [init, setInit] = React.useState(false);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    children.slice(0, latest),
  );

  React.useEffect(() => {
    setInit(true);
    const controls = animate(count, children.length, {
      type: "tween",
      duration: 5,
      ease: "easeInOut",
    });
    return controls.stop;
  }, []);

  return (
    <>
      {init ? (
        <span className="">
          <motion.span>{displayText}</motion.span>
          <CursorBlinker />
        </span>
      ) : null}
    </>
  );
}
