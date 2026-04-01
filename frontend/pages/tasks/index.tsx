import { useEffect } from "react";
import { useRouter } from "next/router";

export default function LegacyTasksRoute() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/work-allocation");
  }, [router]);

  return null;
}
