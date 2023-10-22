import React from "react";

import { Metadata } from "next";
import { AnimateEnter } from "~/components/AnimateEnter";

export const metadata: Metadata = {
  title: "Playground",
  description: "Playground",
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main
        className="relative min-h-screen pb-10"
        style={{
          backgroundImage:
            "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyIj48cGF0aCBkPSJNMTYgMHYxNkgwVjBoMTZaTTggNmEyIDIgMCAxIDAgLjAwMSA0LjAwMUEyIDIgMCAwIDAgOCA2WiIgc3R5bGU9ImZpbGw6IzExMSIvPjwvc3ZnPg==)",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
        }}
      >
        <AnimateEnter>{children}</AnimateEnter>
      </main>
    </>
  );
}
