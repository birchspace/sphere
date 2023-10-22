export function Texture() {
  return (
    <svg className="pointer-events-none fixed left-0 top-0 z-[999] h-screen w-full opacity-5 brightness-[99%] contrast-[50%]">
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency=".8"
          numOctaves="4"
          stitchTiles="stitch"
        ></feTurbulence>
        <feColorMatrix type="saturate" values="0"></feColorMatrix>
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" fill="#111"></rect>
    </svg>
  );
}
