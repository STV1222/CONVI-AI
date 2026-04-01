import { useEffect } from "react";
import { useRouter } from "next/router";

export default function LegacyWorkersRoute() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/providers");
  }, [router]);

  return null;
}
