export function BackGround() {
  return (
    <div className="relative h-screen w-screen">
      <div className="absolute h-full w-full">
        <div className="h-full w-full">
          <video
            src="/videos/hero.mp4"
            autoPlay
            playsInline
            muted
            loop
            className="absolute h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
