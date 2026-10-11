"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

const LightboxImpl = dynamic(() => import("./Lightbox").then((m) => m.Lightbox), { ssr: false });

/** Loads the lightbox code only when a photo is first opened. */
export function Lightbox(props: ComponentProps<typeof LightboxImpl>) {
  if (props.index === null) return null;
  return <LightboxImpl {...props} />;
}
