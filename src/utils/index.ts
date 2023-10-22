import { uniqueNamesGenerator } from "unique-names-generator";
import { adjectives, colors, animals } from "unique-names-generator";

export const getFilteredAuthor = (authorBase58PublicKey: string) => ({
  memcmp: {
    offset: 8, // Discriminator.
    bytes: authorBase58PublicKey,
  },
});

export function shortenAddress(address: string) {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export function jumpLink(text: string) {
  return `https://explorer.solana.com/address/${text}?cluster=devnet`;
}

export function randomName() {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: "_",
    length: 2,
  });
}
