"use client";

import { useCallback, useState } from "react";
import { birthData } from "@/data/birth";

export function useShare() {
  const [toast, setToast] = useState("");

  const share = useCallback(async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: birthData.share.title, text: birthData.share.text, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setToast(birthData.share.copied);
      window.setTimeout(() => setToast(""), 2600);
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        setToast(birthData.share.copied);
        window.setTimeout(() => setToast(""), 2600);
      }
    }
  }, []);

  return { share, toast };
}
