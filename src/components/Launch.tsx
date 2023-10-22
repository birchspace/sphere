"use client";

import React from "react";
import Link from "next/link";
import Lottie from "lottie-react";
import { toast } from "react-toastify";
import { Button } from "@nextui-org/react";
import { useWallet } from "@solana/wallet-adapter-react";

import arrowIcon from "public/static/arrow.json";

export function LaunchButton() {
  const { publicKey } = useWallet();
  const arrowRef = React.useRef<any>();
  const [init, setInit] = React.useState(false);

  const handleLaunch = () => {
    if (!publicKey) {
      toast.warn("🦄 Wow so easy!", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  React.useEffect(() => {
    setInit(true);
  }, []);

  return (
    <>
      {init ? (
        <Link href="/playground">
          <Button
            color="primary"
            variant="faded"
            className="capitalize"
            onMouseEnter={() => arrowRef.current?.play()}
            onMouseLeave={() => arrowRef.current?.stop()}
            endContent={
              <Lottie
                lottieRef={arrowRef}
                animationData={arrowIcon}
                style={{ width: 18, height: 18 }}
                autoplay={false}
                loop={false}
              />
            }
            onPress={handleLaunch}
          >
            Launch&nbsp;Now
          </Button>
        </Link>
      ) : null}
    </>
  );
}
