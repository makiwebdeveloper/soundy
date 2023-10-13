"use client";

import { Button } from "@/components/ui/button";
import { Link2Icon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function CopyLinkButton() {
  const pathname = usePathname();
  const [isCopied, setIsCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_APP_URL}${pathname}`
    );
    setIsCopied(true);
  }

  return (
    <Button onClick={copy}>
      <Link2Icon className="mr-2 w-4 h-4" />
      {isCopied ? "Copied" : "Copy link"}
    </Button>
  );
}
