import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Loading() {
  return (
    <main className="w-full h-screen flex-center">
      <Card className="w-10/12 sm:w-[500px]">
        <CardHeader>
          <CardTitle>Create profile</CardTitle>
          <CardDescription>for listening and uploading tracks</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <p className="text-white/80 leading-none font-medium text-sm">
              Profile image *
            </p>
            <div className="h-[234px] transition flex-center p-10 mt-1 cursor-pointer border border-dashed rounded-3xl border-white/40 dark:border-black/60 bg-white/10 dark:bg-black/20 hover:bg-white/20 dark:hover:bg-black/30 group">
              <Loader />
            </div>
            <p className="mt-2 text-white/80 leading-none font-medium text-sm">
              Profile name *
            </p>
            <Input placeholder="write your profile name" />
            <Button type="submit" className="mt-3 w-full">
              Create
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
