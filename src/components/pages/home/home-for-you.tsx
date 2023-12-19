import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function HomeForYou() {
  return (
    <section className="flex flex-col gap-1">
      <h6 className="font-semibold text-lg">For you</h6>
      <ScrollArea className="w-[calc(100vw-24px)] md:w-auto">
        <div className="flex gap-3">
          {new Array(5).fill(null).map((item, idx) => (
            <div
              key={idx}
              className="w-[138px] h-[138px] md:w-[124px] md:h-[124px] lg:w-[134px] lg:h-[134px] 2xl:w-[179px] 2xl:h-[179px] rounded-md bg-black/40"
            ></div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </section>
  );
}
