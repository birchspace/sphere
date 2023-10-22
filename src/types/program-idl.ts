export type ProgramIdl = {
  version: "0.1.0";
  name: "solana_confessions";
  constants: [
    {
      name: "USER_TAG";
      type: "bytes";
      value: "[85, 83, 69, 82, 95, 83, 84, 65, 84, 69]";
    },
    {
      name: "CONFESSION_TAG";
      type: "bytes";
      value: "[67, 79, 78, 70, 69, 83, 83, 73, 79, 78, 95, 83, 84, 65, 84, 69]";
    },
  ];
  instructions: [
    {
      name: "initializeUser";
      accounts: [
        { name: "authority"; isMut: true; isSigner: true },
        { name: "userProfile"; isMut: true; isSigner: false },
        { name: "systemProgram"; isMut: false; isSigner: false },
      ];
      args: [{ name: "name"; type: "string" }];
    },
    {
      name: "addConfession";
      accounts: [
        { name: "userProfile"; isMut: true; isSigner: false },
        { name: "confessionAccount"; isMut: true; isSigner: false },
        { name: "authority"; isMut: true; isSigner: true },
        { name: "systemProgram"; isMut: false; isSigner: false },
      ];
      args: [
        { name: "confession"; type: "string" },
        { name: "describe"; type: "string" },
      ];
    },
  ];
  accounts: [
    {
      name: "userProfile";
      type: {
        kind: "struct";
        fields: [
          { name: "authority"; type: "publicKey" },
          { name: "lastConfession"; type: "u8" },
          { name: "confessionsCount"; type: "u8" },
          { name: "name"; type: "string" },
        ];
      };
    },
    {
      name: "confessionAccount";
      type: {
        kind: "struct";
        fields: [
          { name: "authority"; type: "publicKey" },
          { name: "idx"; type: "u8" },
          { name: "confession"; type: "string" },
          { name: "describe"; type: "string" },
        ];
      };
    },
  ];
  errors: [
    {
      code: 6000;
      name: "Unauthorized";
      msg: "You are not authorized to perform this action.";
    },
    { code: 6001; name: "NotAllowed"; msg: "Not allowed." },
    {
      code: 6002;
      name: "ConfessionNotEmpty";
      msg: "Confession can't be empty.";
    },
  ];
};

export const IDL: ProgramIdl = {
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
      name: "userProfile",
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
      name: "confessionAccount",
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
};
