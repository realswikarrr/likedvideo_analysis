import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between p-24 gap-4">
      <Button className="bg-zinc-200" variant="ghost">
        Sign In With Google <FcGoogle className="ml-2 w-5 h-5" />
      </Button>

      <Link
        href="https://github.com/realswikarrr/likedvideo_analysis"
        target="_"
      >
        <Button className="text-white" variant="link">
          <FaGithub className="ml-2 w-5 h-5" />
        </Button>
      </Link>
    </main>
  );
}
