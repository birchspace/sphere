import { idl } from "~/config";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

/* Constants for RPC Connection the Solana Blockchain */
export const commitmentLevel = "processed";
export const endpoint = clusterApiUrl("devnet");
export const connection = new Connection(endpoint, commitmentLevel);

/* Constants for the Deployed "Solana Confessions" Program */
export const PROGRAM_PUBKEY = new PublicKey(idl.metadata.address);
export const PROGRAM_INTERFACE = JSON.parse(JSON.stringify(idl));
