"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { setIntroStatus } from "@/lib/intro-store";

const SESSION_KEY = "jhr-intro-seen";
const LIFT_AT = 2000; // ms: curtain starts lifting
const LIFT_FOR = 700; // ms: curtain duration
const HERO_AT = LIFT_AT + 350; // ms: hero entrance starts as the curtain clears

type Phase = "play" | "lift" | "done";

function readEligible() {
  try {
    return (
      window.location.pathname === "/" &&
      !window.sessionStorage.getItem(SESSION_KEY) &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  } catch {
    return false;
  }
}

const noopSubscribe = () => () => {};

/**
 * Cinematic entry, once per session, home page only. Skipped for reduced motion, repeat visits
 * and crawlers (it renders nothing on the server). The hero waits for it via the intro store.
 */
export function Intro() {
  const eligible = useSyncExternalStore(noopSubscribe, readEligible, () => false);
  const [phase, setPhase] = useState<Phase>("play");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!eligible) {
      // During hydration the snapshot is still the server one; only finish if the client agrees.
      if (!readEligible()) setIntroStatus("done");
      return;
    }

    setIntroStatus("playing");
    const timers: number[] = [];
    let raf = 0;
    let lifted = false;
    const start = performance.now();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (LIFT_AT - 100));
      setCount(Math.round(100 * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const lift = (fast: boolean) => {
      if (lifted) return;
      lifted = true;
      cancelAnimationFrame(raf);
      setCount(100);
      setPhase("lift");
      timers.push(
        window.setTimeout(() => setIntroStatus("done"), fast ? 250 : HERO_AT - LIFT_AT),
        window.setTimeout(
          () => {
            setPhase("done");
            document.body.style.overflow = previousOverflow;
            try {
              window.sessionStorage.setItem(SESSION_KEY, "1");
            } catch {
              /* storage unavailable: the intro may replay, which is harmless */
            }
          },
          fast ? 600 : LIFT_FOR,
        ),
      );
    };

    timers.push(window.setTimeout(() => lift(false), LIFT_AT));
    const onSkip = () => lift(true);
    window.addEventListener("jhr-intro-skip", onSkip);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") lift(true);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((id) => window.clearTimeout(id));
      window.removeEventListener("jhr-intro-skip", onSkip);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [eligible]);

  if (!eligible || phase === "done") return null;

  return (
    <div
      role="dialog"
      aria-label="Welcome to Jungle Hill Resort"
      className="grain-layer dark-surface fixed inset-0 z-[100] flex flex-col items-center justify-center bg-night text-pearl"
      style={{
        transform: phase === "lift" ? "translateY(-100%)" : "translateY(0)",
        transition: `transform ${LIFT_FOR}ms var(--ease-out-expo)`,
      }}
    >
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event("jhr-intro-skip"))}
        className="label-mono absolute top-5 right-5 min-h-11 px-3 text-pearl/80 hover:text-pearl sm:top-8 sm:right-8"
      >
        Skip
      </button>

      <Image
        src="/images/logo/jungle-hill-logo-light.png"
        alt="Jungle Hill, Inspiring Cloudline"
        width={982}
        height={642}
        priority
        sizes="(min-width: 640px) 480px, 78vw"
        className="intro-logo h-auto w-[min(78vw,30rem)]"
      />

      <div className="absolute inset-x-5 bottom-8 sm:inset-x-8">
        <div className="flex items-end justify-between">
          <span className="label-mono text-pearl/70">Madikeri, Coorg</span>
          <span className="label-mono text-pearl tabular-nums" aria-hidden="true">
            {String(count).padStart(2, "0")}
          </span>
        </div>
        <div className="mt-3 h-px w-full bg-pearl/15">
          <div
            className="h-px origin-left bg-champagne"
            style={{ transform: `scaleX(${count / 100})` }}
          />
        </div>
      </div>
    </div>
  );
}
