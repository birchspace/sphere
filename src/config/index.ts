export const idl = {
  version: "0.1.0",
  name: "solana_confessions",
  constants: [
    {
      name: "USER_TAG",
      type: "bytes",
      value: "[85, 83, 69, 82, 95, 83, 84, 65, 84, 69]",
    },
    {
      name: "CONFESSION_TAG",
      type: "bytes",
      value: "[67, 79, 78, 70, 69, 83, 83, 73, 79, 78, 95, 83, 84, 65, 84, 69]",
    },
  ],
  instructions: [
    {
      name: "initializeUser",
      accounts: [
        { name: "authority", isMut: true, isSigner: true },
        { name: "userProfile", isMut: true, isSigner: false },
        { name: "systemProgram", isMut: false, isSigner: false },
      ],
      args: [{ name: "name", type: "string" }],
    },
    {
      name: "addConfession",
      accounts: [
        { name: "userProfile", isMut: true, isSigner: false },
        { name: "confessionAccount", isMut: true, isSigner: false },
        { name: "authority", isMut: true, isSigner: true },
        { name: "systemProgram", isMut: false, isSigner: false },
      ],
      args: [
        { name: "confession", type: "string" },
        { name: "describe", type: "string" },
      ],
    },
  ],
  accounts: [
    {
      name: "UserProfile",
      type: {
        kind: "struct",
        fields: [
          { name: "authority", type: "publicKey" },
          { name: "lastConfession", type: "u8" },
          { name: "confessionsCount", type: "u8" },
          { name: "name", type: "string" },
        ],
      },
    },
    {
      name: "ConfessionAccount",
      type: {
        kind: "struct",
        fields: [
          { name: "authority", type: "publicKey" },
          { name: "idx", type: "u8" },
          { name: "confession", type: "string" },
          { name: "describe", type: "string" },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "Unauthorized",
      msg: "You are not authorized to perform this action.",
    },
    { code: 6001, name: "NotAllowed", msg: "Not allowed." },
    {
      code: 6002,
      name: "ConfessionNotEmpty",
      msg: "Confession can't be empty.",
    },
  ],
  metadata: {
    address: "5Enc6iUf9iEs32h8ztVx86XiLUz4JL6tA3Gpz14sf1AV",
  },
};

export const NavMenuTrigger =
  "group/root flex items-center gap-3 h-10 px-4 text-neutral-50/80 hover:text-neutral-50 data-[state='open']:text-neutral-50 duration-250 font-medium rounded-lg";
export const NavMenuContent =
  "absolute top-0 left-0 p-3 duration-250 data-[motion='from-start']:animate-enter-from-l data-[motion='from-end']:animate-enter-from-r data-[motion='to-start']:animate-exit-to-l data-[motion='to-end']:animate-exit-to-r";
export const NavMenuViewport =
  "relative origin-top-left w-[--radix-navigation-menu-viewport-width] overflow-hidden backdrop-blur-xl backdrop-brightness-[40%] backdrop-contrast-[77.5%] border border-neutral-50/10 ring-1 ring-neutral-950/75 text-neutral rounded-xl shadow-[0_6px_22px_#11111166] h-[--radix-navigation-menu-viewport-height] duration-250 ease-out data-[state='open']:animate-enter-from-t data-[state='closed']:animate-exit-to-t";

export interface AnimateEnterProps {
  children: React.ReactNode;
  className?: string;
}
