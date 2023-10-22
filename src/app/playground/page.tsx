"use client";

import { CardList } from "~/components/dashboard/CardList";

export default function Playground() {
  return (
    <section className="container min-h-screen flex-1 items-start pt-28 md:grid md:grid-cols-[minmax(0,1fr)_220px] md:gap-6">
      <CardList />
    </section>
  );
}
