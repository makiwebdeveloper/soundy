import { SearchModalHeader } from "@/components/pages/search";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EraserIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="transition-all fixed top-0 left-0 w-full h-screen backdrop-blur-sm flex-center bg-white/20 dark:bg-black/20">
      <article className="w-[600px] flex flex-col gap-3 border border-white/40 bg-white/30 p-6 shadow-lg rounded-lg dark:border-black/60 dark:bg-black/40 backdrop-blur-md">
        <SearchModalHeader />
        <div>
          <form className="flex gap-3">
            <div className="flex-1 relative">
              <Input disabled={true} autoFocus placeholder="Search..." />
              <button className="absolute top-[50%] translate-y-[-50%] right-0 p-3">
                <EraserIcon className="w-4 h-4" />
              </button>
            </div>
            <Button type="submit" loading={true}>
              Search
            </Button>
          </form>
          <div className="mt-3 h-[250px]"></div>
        </div>
      </article>
    </div>
  );
}
