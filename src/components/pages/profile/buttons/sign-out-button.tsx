import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import { LogOutIcon } from "lucide-react";

export default function SignOutButton() {
  const { signOut } = useClerk();

  return (
    <Button className="flex h-9 rounded-md px-3" onClick={() => signOut()}>
      <LogOutIcon className="w-5 h-5 mr-2" /> Sign out
    </Button>
  );
}
