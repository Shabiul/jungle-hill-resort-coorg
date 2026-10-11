import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site.config";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

async function dataUri(publicPath: string, mime: string) {
  const file = await readFile(path.join(process.cwd(), "public", publicPath));
  return `data:${mime};base64,${file.toString("base64")}`;
}

/** 1200x630 share image: the real resort photo, the logo, a headline and the tagline. */
export async function ogImage(title: string, photo = "/images/hero/hero-a-dusk-cottages.jpg") {
  const [bg, logo] = await Promise.all([
    dataUri(photo, "image/jpeg"),
    dataUri("/images/logo/jungle-hill-logo-light.png", "image/png"),
  ]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#0D1319" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={bg} alt="" width={1200} height={630} style={{ position: "absolute", inset: 0, width: 1200, height: 630, objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", background: "linear-gradient(180deg, rgba(13,19,25,0.25) 0%, rgba(13,19,25,0.88) 100%)" }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, width: "100%", height: "100%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="" height={96} style={{ height: 96, width: "auto", alignSelf: "flex-start" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 76, lineHeight: 1.05, color: "#F4F2EE", fontWeight: 400 }}>{title}</div>
            <div style={{ display: "flex", marginTop: 20, fontSize: 28, letterSpacing: 6, textTransform: "uppercase", color: "#E1D3B4" }}>
              {siteConfig.tagline} · Coorg
            </div>
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
