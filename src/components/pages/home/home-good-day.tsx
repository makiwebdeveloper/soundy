export default function HomeGoodDay() {
  const currentTime = new Date().getHours();
  let greetingText = "";

  if (currentTime < 12) {
    greetingText = "Good morning";
  } else if (currentTime < 18) {
    greetingText = "Good afternoon";
  } else {
    greetingText = "Good evening";
  }

  return (
    <section className="flex flex-col gap-1">
      <h6 className="font-semibold text-lg">{greetingText}</h6>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {new Array(6).fill(null).map((item, idx) => (
          <div
            key={idx}
            className="h-[45px] xs:h-[60px] rounded-md bg-black/20"
          >
            <div className="bg-black/20 w-[45px] xs:w-[60px] rounded-l-md h-full"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
