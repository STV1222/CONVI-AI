import { useEffect } from "react";
import { useRouter } from "next/router";

export default function LegacyAiRoute() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/ai-copilot");
  }, [router]);

  return null;
}
