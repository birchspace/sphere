import React from "react";
import dynamic from "next/dynamic";

function NoSSR(props: React.PropsWithChildren) {
  return <>{props.children}</>;
}

export default dynamic(() => Promise.resolve(NoSSR), {
  ssr: false,
});
