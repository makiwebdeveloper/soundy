"use client";

import { Button } from "@/components/ui/button";
import { BadgeInfoIcon } from "lucide-react";

interface Props {}

export default function DetailsButton({}: Props) {
  return (
    <Button>
      <BadgeInfoIcon className="mr-2 w-4 h-4" />
      Details
    </Button>
  );
}
