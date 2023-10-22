import { TextAnim } from "~/components/TextAnim";
import { LaunchButton } from "~/components/Launch";
import { BackGround } from "~/components/BackGround";

export default function HomePage() {
  return (
    <main className="relative">
      <BackGround />
      <div className="absolute left-1/2 top-1/2 mx-auto flex w-full max-w-6xl -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-24 lg:px-8">
        <LaunchButton />
        <div className="m-auto mt-8 max-w-2xl text-lg text-zinc-200 sm:text-center">
          <TextAnim>
            Commencing from the origin. Foster an open, inclusive, and
            innovative community, where everyone may find their rightful place
            in this digital world
          </TextAnim>
        </div>
      </div>
    </main>
  );
}
