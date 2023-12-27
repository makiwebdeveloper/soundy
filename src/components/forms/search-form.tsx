"use client";

import { useCallback, useState, useTransition } from "react";
import { EraserIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

export default function SearchForm() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [value, setValue] = useState("");

  const handleSearchParams = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    if (value.length > 0) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }, [pathname, router, value]);

  return (
    <form className="flex gap-3">
      <div className="flex-1 relative">
        <Input
          autoFocus
          placeholder="Search..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="pr-8"
        />
        <button
          type="button"
          onClick={() => setValue("")}
          className="absolute top-[50%] translate-y-[-50%] right-0 outline-none p-3"
        >
          <EraserIcon className="w-4 h-4" />
        </button>
      </div>
      <Button
        type="submit"
        loading={isPending}
        onClick={(e) => {
          e.preventDefault();
          handleSearchParams();
        }}
      >
        {!isPending && <SearchIcon className="w-4 h-4 mr-2" />} Search
      </Button>
    </form>
  );
}
