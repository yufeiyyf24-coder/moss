"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Caregiver = {
  id: string;
  short: string;
  name: string;
  age: string;
  role: string;
  duration: string;
  situation: string;
  daily: string;
  deep: string;
};

function Person({ older = false, color = "#719e96" }: { older?: boolean; color?: string }) {
  return (
    <>
      {/* Flat silhouettes keep the portrait illustrative, rather than photographic. */}
      {!older && <path d="M77 124C61 98 66 48 94 40c33-13 64 10 65 42l-1 54Z" fill="#405454" />}
      <path d="M96 127h30v32H96Z" fill="#d6ab8c" />
      <path d="M43 233c2-55 17-85 54-88l14 17 16-17c36 4 51 32 55 88Z" fill={color} />
      <path d="m96 145 15 17 16-17-4 34h-23Z" fill="#f5eee1" />
      <ellipse cx="111" cy="91" rx="34" ry="43" fill="#e6c3a3" />
      {older ? (
        <>
          <path d="M76 82c-10-33 9-48 34-48 31-1 47 24 35 51l-8-24c-18 7-31 7-46-1Z" fill="#76817c" />
          <path d="M79 91h24v15H82Zm40 0h24l-3 15h-22ZM103 96h16" fill="none" stroke="#536561" strokeWidth="2" />
          <path d="m102 119 9-3 10 3" fill="none" stroke="#8e8170" strokeWidth="3" strokeLinecap="round" />
        </>
      ) : (
        <path d="M77 92c-7-31 6-53 34-53 31 0 42 20 37 50-12-6-21-19-24-31-11 17-29 24-47 26Z" fill="#405454" />
      )}
      <path d="M94 94h3m29 0h3" stroke="#48564f" strokeWidth="3" strokeLinecap="round" />
      <path d="m111 96-2 13h5m-10 10q7 5 14 0" fill="none" stroke="#a77b63" strokeWidth="1.5" strokeLinecap="round" />
      <path d="m57 181 20 42h61l24-43" fill="none" stroke="#426f69" strokeOpacity=".35" strokeWidth="2" />
      <path d="m78 192 35 6 32-7-7 39-27 5-29-6Z" fill="#f3efdf" />
      <path d="m113 199-2 36" stroke="#cccfb9" strokeWidth="1.5" />
      <path d="M71 210c4-6 15-2 22 2l-2 9c-9 2-18 0-20-4Zm80-1c-5-5-14-1-20 3l2 9c9 1 16-2 19-6Z" fill="#e6c3a3" />
    </>
  );
}

function CaregiverPortrait({ kind }: { kind: string }) {
  return (
    <svg viewBox="0 0 260 260" className="h-28 w-28 sm:h-48 sm:w-48" fill="none" aria-hidden="true">
      <path d="M38 68C57 26 125 19 175 35c54 17 78 66 61 120-17 57-61 89-122 78-60-10-101-52-88-106Z" fill={kind === "b" ? "#e4e8d7" : "#d8e9e3"} />
      <path d="M218 211c-4-33-2-54 13-78m-11 58c-15-5-21-13-20-23 13 2 21 11 20 23m3-19c14-4 21-11 22-22-13 1-21 10-22 22" stroke="#9fbaaa" strokeWidth="2" strokeLinecap="round" />
      {kind === "c" ? (
        <>
          <g transform="translate(-3 66) scale(.69)"><Person older color="#8fa99a" /></g>
          <g transform="translate(99 65) scale(.69)"><Person color="#b9baa0" /></g>
          <g transform="translate(41 25) scale(.85)"><Person color="#668f89" /></g>
        </>
      ) : (
        <g transform="translate(14 8)"><Person older={kind === "b"} /></g>
      )}
      <path d="M45 244h165" stroke="#b7ccc0" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CaregiverCarousel({ people }: { people: Caregiver[] }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const viewport = useRef<HTMLDivElement>(null);
  const id = useId();
  const count = people.length;
  const move = (direction: number) => setActive((current) => (current + direction + count) % count);

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    let accumulated = 0;
    let lastSwitch = -Infinity;
    let lastEvent = 0;
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      const now = performance.now();
      if (now - lastEvent > 180) accumulated = 0;
      lastEvent = now;
      if (now - lastSwitch < 600) return;
      accumulated += event.deltaX;
      if (Math.abs(accumulated) < 45) return;
      const direction = accumulated > 0 ? 1 : -1;
      setActive((current) => (current + direction + count) % count);
      accumulated = 0;
      lastSwitch = now;
    };
    element.addEventListener("wheel", onWheel, { passive: false });
    return () => element.removeEventListener("wheel", onWheel);
  }, [count]);

  return (
    <section aria-label="照护者画像" aria-roledescription="轮播" className="mt-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs tracking-wide text-moss-ink/55">两位照护者画像 · 一种共通处境</p>
        <p className="text-xs text-[#568d86]">左右滑动，看看不同的照护日常</p>
      </div>
      <div
        ref={viewport}
        tabIndex={0}
        aria-label="使用左右方向键切换画像"
        className="overflow-hidden rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-shx-teal/60"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        <motion.div
          className="grid cursor-grab items-stretch py-5 active:cursor-grabbing"
          style={{ touchAction: "pan-y" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={(_, info) => {
            if (Math.abs(info.offset.x) > 45 || Math.abs(info.velocity.x) > 350) move(info.offset.x < 0 ? 1 : -1);
          }}
        >
          {people.map((person, index) => {
            const relative = (index - active + count) % count;
            const position = relative > count / 2 ? relative - count : relative;
            const selected = position === 0;
            return (
              <motion.article
                id={`${id}-${index}`}
                key={person.id}
                role="group"
                aria-roledescription="幻灯片"
                aria-label={`${index + 1} / ${count}：${person.name}`}
                aria-hidden={!selected}
                inert={!selected}
                initial={false}
                animate={{ x: `${position * 100}%`, scale: selected ? 1 : 0.88, opacity: selected ? 1 : 0.42 }}
                transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="col-start-1 row-start-1 mx-auto w-[84%] rounded-[24px] border border-white/80 bg-[#f8fbf6] p-5 shadow-[0_12px_40px_-28px_rgba(44,79,69,0.3)] sm:w-[78%] sm:p-8 lg:w-[76%] lg:p-10"
                style={{ zIndex: selected ? 2 : 1 }}
              >
                <div className="grid gap-6 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-8">
                  <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-0">
                    <div className="-ml-3 shrink-0"><CaregiverPortrait kind={person.id} /></div>
                    <div>
                      <p className="text-[10px] tracking-[0.16em] text-[#568d86]">{person.id === "c" ? "共通处境" : "照护者画像"}</p>
                      <h3 className="mt-2 font-wenkai text-2xl text-moss-ink sm:text-3xl">{person.name}</h3>
                      <p className="mt-2 flex flex-wrap gap-x-2 text-xs leading-6 text-moss-ink/60">
                        {person.age && <span className="whitespace-nowrap">{person.age}</span>}
                        {person.duration && <span className="whitespace-nowrap">{person.duration}</span>}
                      </p>
                      <p className="mt-2 max-w-48 text-xs leading-6 text-moss-ink/65">{person.role}</p>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <span aria-hidden="true" className="block h-8 font-wenkai text-5xl leading-none text-shx-teal/35">“</span>
                    <blockquote className="font-wenkai text-xl leading-relaxed text-moss-ink sm:text-2xl">{person.short}</blockquote>
                    <div className="mt-6 space-y-5">
                      <div>
                        <h4 className="text-xs font-normal tracking-wide text-[#568d86]">{person.id === "c" ? "共同的需要" : "正在面对"}</h4>
                        <p className="mt-2 text-sm font-light leading-7 text-moss-ink/75">{person.situation}</p>
                      </div>
                      {person.daily && <div>
                        <h4 className="text-xs font-normal tracking-wide text-[#568d86]">日常循环</h4>
                        <p className="mt-2 text-sm font-light leading-7 text-moss-ink/65">{person.daily}</p>
                      </div>}
                      <div className="border-t border-[#568d86]/15 pt-4">
                        <h4 className="text-xs font-normal tracking-wide text-[#568d86]">{person.id === "c" ? "留下的提问" : "更深处的担心"}</h4>
                        <p className="mt-2 font-wenkai text-base leading-7 text-[#568d86]">{person.deep}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
      <div className="mt-5 flex items-center justify-center gap-6">
        <button type="button" onClick={() => move(-1)} aria-label="上一张画像" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#568d86]/30 text-[#568d86] transition-colors hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-shx-teal">←</button>
        <div className="flex items-center gap-3">
          {people.map((person, index) => <button
            key={person.id}
            type="button"
            aria-label={`查看${person.name}`}
            aria-current={active === index ? "true" : undefined}
            aria-controls={`${id}-${index}`}
            onClick={() => setActive(index)}
            className="flex h-11 min-w-6 items-center justify-center rounded focus-visible:outline-2 focus-visible:outline-shx-teal"
          ><span className={`h-1.5 rounded-full transition-all motion-reduce:transition-none ${active === index ? "w-7 bg-[#568d86]" : "w-1.5 bg-[#568d86]/25"}`} /></button>)}
        </div>
        <button type="button" onClick={() => move(1)} aria-label="下一张画像" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#568d86]/30 text-[#568d86] transition-colors hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-shx-teal">→</button>
      </div>
      <p aria-live="polite" aria-atomic="true" className="mt-2 text-center text-xs text-moss-ink/55">{String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")} · {people[active].name}</p>
    </section>
  );
}
