"use client";

import { Volume2Icon, VolumeXIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface Props {
  volume: number;
  toggleMute: () => void;
  handleVolumeChange: (v: number) => void;
}

export default function PlayerVolume({
  volume,
  toggleMute,
  handleVolumeChange,
}: Props) {
  return (
    <div className="w-[50px] md:w-[150px] flex items-center gap-2 px-2">
      <Button
        size="icon"
        variant="ghost"
        className="hover:bg-white/20 dark:hover:bg-black/20"
        onClick={toggleMute}
      >
        {volume === 0 ? (
          <VolumeXIcon className="w-4 h-4" />
        ) : (
          <Volume2Icon className="w-4 h-4" />
        )}
      </Button>
      <Slider
        min={0}
        max={1}
        step={0.05}
        value={[volume]}
        onValueChange={(v) => handleVolumeChange(v[0])}
        className="flex-1 hidden md:flex"
      />
    </div>
  );
}
