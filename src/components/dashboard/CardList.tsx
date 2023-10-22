"use client";

import { Button } from "@nextui-org/react";
import { useProgram } from "~/context/ProgramContext";
import { CardItem } from "~/components/dashboard/CardItem";
import { ProgramAccount } from "@project-serum/anchor";

export function CardList() {
  const { allConfessions } = useProgram();

  return (
    <div className="grid h-full w-full grid-cols-3 gap-8">
      {allConfessions.length > 0 ? (
        <>
          {allConfessions.map((con: ProgramAccount, i: number) => {
            const { publicKey, account } = con;
            const { authority, confession, describe } = account;
            const strAuthority = authority.toString();
            const strPublicKey = publicKey.toString();

            return (
              <CardItem
                index={i}
                describe={describe}
                confession={confession}
                authority={strAuthority}
                publicKey={strPublicKey}
                key={`${strAuthority}-${confession}-${i}`}
              />
            );
          })}
        </>
      ) : (
        <div className="flex w-[80vw] items-center justify-center py-8">
          <div className="h-12 w-12 animate-spin rounded-full border border-solid border-yellow-500 border-t-transparent"></div>
        </div>
      )}
    </div>
  );
}
