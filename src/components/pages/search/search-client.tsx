"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { SearchResult } from "@/types/search.types";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EraserIcon, SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchItems from "./search-items";

export default function SearchClient() {
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get("value") || "");
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<SearchResult>({
    tracks: [],
    albums: [],
    profiles: [],
    playlists: [],
  });

  const router = useRouter();

  const { refetch } = useQuery({
    queryKey: ["search"],
    queryFn: async () => {
      setIsLoading(true);

      const res = await axios.get<{ items: SearchResult }>(
        `/api/search?value=${value}`
      );
      return res.data;
    },
    enabled: false,
    onSuccess: (data) => {
      router.replace(`/search${value ? "?value=" + value : ""}`, {
        scroll: false,
      });
      setItems(data.items);
    },
    onError: () => {
      setValue("");
      setItems({
        tracks: [],
        albums: [],
        profiles: [],
        playlists: [],
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  useEffect(() => {
    if (value) {
      refetch();
    }
  }, []);

  return (
    <div>
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
        <Button type="submit" loading={isLoading} onClick={() => refetch()}>
          {!isLoading && <SearchIcon className="w-4 h-4 mr-2" />} Search
        </Button>
      </form>
      <SearchItems items={items} />
    </div>
  );
}
