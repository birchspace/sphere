import { SpCard } from "~/components/sp/Card";
import { About } from "~/components/sp/About";

export default function SpPage({ params }: { params: { sp: string[] } }) {
  return (
    <section className="w-full snap-y snap-mandatory overflow-y-auto">
      <SpCard />
      <About />
    </section>
  );
}
