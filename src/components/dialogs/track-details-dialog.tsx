"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { BadgeInfoIcon } from "lucide-react";
import { FullTrackType } from "@/types/tracks.types";
import Link from "next/link";

interface Props {
  track: FullTrackType;
}

export default function TrackDetailsDialog({ track }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <BadgeInfoIcon className="mr-2 w-4 h-4" />
          Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] gap-2">
        <DialogTitle className="text-2xl break-all">{track.title}</DialogTitle>
        <div>
          {track.description && (
            <p className="flex justify-between gap-2">
              Description:{" "}
              <span className="text-white/70 dark:text-white/50 break-all">
                {track.description}{" "}
              </span>
            </p>
          )}
          {track.genre && (
            <p className="flex justify-between gap-2">
              Genre:{" "}
              <span className="text-white/70 dark:text-white/50 break-all">
                {track.genre}
              </span>
            </p>
          )}
          {track.album && (
            <p className="flex justify-between gap-2">
              Album:{" "}
              <Link
                href={`/profiles/${track.album.profileId}/albums/${track.album.id}`}
                className="break-all transition text-white/70 dark:text-white/50 hover:text-white dark:hover:text-white hover:underline underline-offset-2"
              >
                {track.album.title}
              </Link>
            </p>
          )}
          <p className="flex justify-between gap-2">
            Duration:{" "}
            <span className="text-white/70 dark:text-white/50 break-all">
              {track.duration}
            </span>
          </p>
          <p className="flex justify-between gap-2">
            Made by:{" "}
            <Link
              href={`/profiles/${track.profile.id}`}
              className="break-all transition text-white/70 dark:text-white/50 hover:text-white dark:hover:text-white hover:underline underline-offset-2"
            >
              {track.profile.name}
            </Link>
          </p>
          <p className="flex justify-between gap-2">
            Date:{" "}
            <span className="text-white/70 dark:text-white/50 break-all">
              {new Date(track.createdAt).toLocaleDateString()}
            </span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
