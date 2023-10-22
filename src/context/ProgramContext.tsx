"use client";

import { randomName } from "~/utils";
import { getFilteredAuthor } from "~/utils";
import { SystemProgram } from "@solana/web3.js";
import { ProgramIdl } from "~/types/program-idl";
import { commitmentLevel } from "~/utils/constants";
import { useEffect, useMemo, useState } from "react";
import { ReactNode, createContext, useContext } from "react";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { PROGRAM_INTERFACE, PROGRAM_PUBKEY } from "~/utils/constants";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { AnchorWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import { AnchorProvider, Program, ProgramAccount } from "@project-serum/anchor";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";

interface IProgramContext {
  userName: string;
  authority: string;
  isLoading: boolean;
  isInitialized: boolean;
  isTransactionPending: boolean;
  allConfessions: ProgramAccount[];
  userConfessions: ProgramAccount[];
  initializeUser: () => Promise<any>;
  getAllConfessions: () => Promise<any>;
  findProfileAccounts: () => Promise<any>;
  addConfession: (confession: string, describe: string) => Promise<any>;
}

const ProgramContext = createContext<IProgramContext>({
  userName: "",
  authority: "",
  isTransactionPending: false,
  isLoading: false,
  isInitialized: false,
  allConfessions: [],
  userConfessions: [],
  addConfession: async () => {},
  initializeUser: async () => {},
  getAllConfessions: async () => {},
  findProfileAccounts: async () => {},
});

export const ProgramProvider = ({ children }: { children: ReactNode }) => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const anchorWallet = useAnchorWallet() as AnchorWallet;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTransactionPending, setIsTransactionPending] =
    useState<boolean>(false);

  const [userName, setUserName] = useState<string>("");
  const [authority, setAuthority] = useState<string>("");
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [userConfessions, setUserConfessions] = useState<ProgramAccount[]>([]);
  const [allConfessions, setAllConfessions] = useState<ProgramAccount[]>([]);
  const [lastConfession, setLastConfession] = useState<number>(0);

  const program = useMemo(() => {
    if (anchorWallet) {
      const provider = new AnchorProvider(connection, anchorWallet, {
        preflightCommitment: commitmentLevel,
      });
      return new Program(
        PROGRAM_INTERFACE,
        PROGRAM_PUBKEY,
        provider,
      ) as Program<ProgramIdl>;
    }
  }, [connection, anchorWallet]);

  // 获取所有
  const getAllConfessions = async () => {
    try {
      setIsLoading(true);
      const confessions: any = await program!.account.confessionAccount.all();
      setAllConfessions(confessions);
    } catch (error) {
      console.error(error);

      setAllConfessions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 查找
  const findProfileAccounts = async () => {
    try {
      setIsLoading(true);
      const [profilePda, _profileBump] = await findProgramAddressSync(
        [utf8.encode("USER_STATE"), publicKey!.toBuffer()],
        program!.programId,
      );

      const profileAccount: any =
        await program!.account.userProfile.fetch(profilePda);
      if (profileAccount.name) {
        setUserName(profileAccount.name);
      }

      if (profileAccount) {
        setAuthority(profileAccount.authority.toString());
        setLastConfession(profileAccount.lastConfession);
        setIsInitialized(true);

        const confessionAccount: any =
          await program!.account.confessionAccount.all([
            getFilteredAuthor(publicKey!.toString()),
          ]);

        setUserConfessions(confessionAccount);
      }
    } catch (error) {
      console.error(error);
      setUserConfessions([]);

      if (!isInitialized) await initializeUser();
    } finally {
      setIsLoading(false);
    }
  };

  // 初始化
  const initializeUser = async () => {
    if (program && publicKey && !isInitialized) {
      try {
        setIsTransactionPending(true);
        const [profilePda, _profileBump] = findProgramAddressSync(
          [utf8.encode("USER_STATE"), publicKey.toBuffer()],
          program.programId,
        );
        const nmae = randomName();
        await program.methods
          .initializeUser(nmae)
          .accounts({
            userProfile: profilePda,
            authority: publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        setIsInitialized(true);
      } catch (error: any) {
        console.error("initializeUser error:", error);
      } finally {
        setIsTransactionPending(false);
      }
    }
  };

  // 创建
  const addConfession = async (confession: string, describe: string) => {
    setIsTransactionPending(false);
    if (program && publicKey) {
      if (!confession) {
        return;
      }

      try {
        setIsTransactionPending(true);
        const [profilePda, _profileBump] = findProgramAddressSync(
          [utf8.encode("USER_STATE"), publicKey.toBuffer()],
          program.programId,
        );
        const [confessionPda, _confessionBump] = findProgramAddressSync(
          [
            utf8.encode("CONFESSION_STATE"),
            publicKey.toBuffer(),
            Uint8Array.from([lastConfession]),
          ],
          program.programId,
        );

        const tx = await program.methods
          .addConfession(confession, describe)
          .accounts({
            userProfile: profilePda,
            confessionAccount: confessionPda,
            authority: publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        setIsTransactionPending(false);

        await getAllConfessions();
        await findProfileAccounts();

        return { success: tx };
      } catch (error: any) {
        console.error(error);

        setIsTransactionPending(false);

        return { error };
      }
    }
  };

  useEffect(() => {
    if (!isInitialized && program && publicKey && !isTransactionPending) {
      findProfileAccounts();
      getAllConfessions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey, program, isTransactionPending]);

  const exposed: IProgramContext = {
    userName,
    authority,
    isLoading,
    isInitialized,
    allConfessions,
    userConfessions,
    isTransactionPending,
    addConfession,
    initializeUser,
    getAllConfessions,
    findProfileAccounts,
  };

  return (
    <ProgramContext.Provider value={exposed}>
      {children}
    </ProgramContext.Provider>
  );
};

export const useProgram = () => {
  let context = useContext(ProgramContext);
  if (context === undefined) {
    throw new Error("useProgram must be used insid  e ProgramProvider");
  } else {
    return context;
  }
};
