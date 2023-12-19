export default function HomeHeader() {
  return (
    <header className="flex items-center gap-3 2xl:gap-5">
      <h1 className="text-4xl 2xl:text-6xl font-bold">Soundy</h1>
      <div className="h-7 2xl:h-14 w-[3px] 2xl:w-1 bg-white rounded-full"></div>
      <h3 className="text-xl 2xl:text-2xl font-semibold">Home</h3>
    </header>
  );
}
