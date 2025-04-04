import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function GetStartedButton({ className }) {
  const router = useRouter();
  return (
    <Button
      variant="secondary"
      className={cn("h-12 space-x-2 text-lg", className)}
      onClick={() => {
        router.push("sign-in");
      }}
    >
      <span>Get Started</span>
      <ArrowRightIcon />
    </Button>
  );
}
