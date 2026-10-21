"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { setIntroStatus } from "@/lib/intro-store";

const SESSION_KEY = "jhr-intro-seen";
const LIFT_AT = 1000; // ms: curtain starts lifting (1.4 s in total with the lift)
const LIFT_FOR = 400; // ms: curtain duration
const HERO_AT = LIFT_AT + 200; // ms: hero entrance starts as the curtain clears
const MIN_SHOW = 750; // ms: shortest the logo stays (its reveal takes about 0.6 s), even if the first photo is in

type Phase = "play" | "lift" | "done";

/** Decided once per page load, so it cannot flip while the intro is running. */
let decision: boolean | null = null;

function readEligible() {
  if (decision !== null) return decision;
  try {
    const eligible =
      window.location.pathname === "/" &&
      !window.sessionStorage.getItem(SESSION_KEY) &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // On a very slow connection scripts arrive late and the hero has long been on screen, so a
    // preloader would only get in the way.
    const scriptsLate = performance.now() > 2500;
    decision = eligible && !scriptsLate;
  } catch {
    decision = false;
  }
  return decision;
}

const noopSubscribe = () => () => {};

/**
 * Cinematic entry (1.8 s at most), once per session, home page only. Skipped for reduced motion, repeat visits
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

    // Dismiss early once the first hero photo has loaded, after a short minimum so it never flickers.
    const onHeroReady = () => {
      const remaining = Math.max(0, MIN_SHOW - (performance.now() - start));
      timers.push(window.setTimeout(() => lift(true), remaining));
    };
    window.addEventListener("jhr-hero-ready", onHeroReady);
    if ((window as Window & { __heroReady?: boolean }).__heroReady) onHeroReady();
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
      window.removeEventListener("jhr-hero-ready", onHeroReady);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [eligible]);

  if (!eligible || phase === "done") return null;

  return (
    <div
      role="dialog"
      aria-label="Welcome to Jungle Hill Resort"
      className="grain-layer fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface text-body"
      style={{
        transform: phase === "lift" ? "translateY(-100%)" : "translateY(0)",
        transition: `transform ${LIFT_FOR}ms var(--ease-out-expo)`,
      }}
    >
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event("jhr-intro-skip"))}
        className="label-mono absolute top-5 right-5 min-h-11 px-3 text-body/80 hover:text-body sm:top-8 sm:right-8"
      >
        Skip
      </button>

      <Image
        src="/images/logo/jungle-hill-logo-dark.png"
        alt="Jungle Hill, Inspiring Cloudline"
        width={982}
        height={642}
        priority
        sizes="(min-width: 640px) 480px, 78vw"
        className="intro-logo h-auto w-[min(78vw,30rem)]"
      />

      <div className="absolute inset-x-5 bottom-8 sm:inset-x-8">
        <div className="flex items-end justify-between">
          <span className="label-mono text-body/80">Madikeri, Coorg</span>
          <span className="label-mono text-body tabular-nums" aria-hidden="true">
            {String(count).padStart(2, "0")}
          </span>
        </div>
        <div className="mt-3 h-px w-full bg-line">
          <div
            className="h-px origin-left bg-burgundy"
            style={{ transform: `scaleX(${count / 100})` }}
          />
        </div>
      </div>
    </div>
  );
}
