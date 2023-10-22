"use client";

import React from "react";
import { toast } from "react-toastify";
import { Button, button } from "@nextui-org/react";
import { useProgram } from "~/context/ProgramContext";

export function CreateButton() {
  const [init, setInit] = React.useState(false);

  const { addConfession } = useProgram();

  const handle = async () => {
    const res = await addConfession("测试");
    console.log(res);
  };
  React.useEffect(() => {
    setInit(true);
  }, []);

  return <>{init ? <Button onPress={handle}>创建</Button> : null}</>;
}
