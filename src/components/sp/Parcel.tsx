"use client";

import React from "react";
import Lottie from "lottie-react";

import arrowIcon from "public/static/down-arrow.json";

export default function Parcel(
  props: React.PropsWithChildren<{
    name: string;
    description: string;
    accentColor?: string;
  }>,
) {
  const arrowRef = React.useRef<any>();

  const [init, setInit] = React.useState(false);

  const { accentColor = "text-green-900" } = props;

  React.useEffect(() => {
    setInit(true);
  }, []);

  return (
    <div className="z-50 h-[100vh] w-full snap-center scroll-mt-6 overflow-x-hidden">
      <div className="relative h-full w-full">
        <div className="absolute h-full w-full">
          <div className="absolute h-full w-full">{props.children}</div>
        </div>
        <div className="absolute h-full w-full overflow-x-hidden bg-gradient-to-t from-neutral-950" />
        <div className="absolute flex h-full w-full flex-col overflow-x-hidden p-6 md:flex-row md:p-12">
          <div className="my-auto md:mb-0 md:mr-auto md:mt-auto">
            {init ? (
              <h1 className="pb-1 font-display text-4xl font-semibold text-neutral-50 md:pb-3 md:text-5xl lg:text-6xl xl:text-8xl">
                {props.name}
                <span className={accentColor}></span>
              </h1>
            ) : null}
            <h2 className="text-xl text-neutral md:text-2xl xl:text-3xl">
              {props.description}
            </h2>
          </div>
          <button
            onMouseEnter={() => arrowRef.current?.play()}
            onMouseLeave={() => arrowRef.current?.stop()}
          >
            <Lottie
              lottieRef={arrowRef}
              animationData={arrowIcon}
              style={{ width: 18, height: 18, fill: "green" }}
              autoplay={true}
              loop={true}
              className="stroke-green-500"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
