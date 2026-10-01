"use client";

import { useEffect, useRef, useState } from "react";
import { Sora, DM_Sans } from "next/font/google";

const display = Sora({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--f-display" });
const body = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--f-body" });

/* ============ APNI DETAILS YAHAN BADLO ============ */
const BUSINESS = {
  name: "Shubh Utsav",
  tag: "Event Studio",
  city: "Jaipur, Rajasthan",
  phone: "917014851519", // country code ke saath, + ke bina
  phoneShow: "+91 70148 51519",
  email: "hello@shubhutsav.in",
  instagram: "https://instagram.com/yourhandle",
};

const EVENT_TYPES = [
  { key: "Shaadi", mult: 1.4 },
  { key: "Corporate", mult: 1.15 },
  { key: "Birthday", mult: 0.8 },
  { key: "Social", mult: 0.95 },
];

// flat = fixed kharcha, pg = per guest kharcha (rupees)
const PLAN_SERVICES = [
  { key: "venue", label: "Venue", flat: 50000, pg: 450 },
  { key: "decor", label: "Decoration", flat: 60000, pg: 150 },
  { key: "catering", label: "Catering", flat: 0, pg: 850 },
  { key: "photo", label: "Photo + Video", flat: 45000, pg: 0 },
  { key: "ent", label: "Entertainment", flat: 40000, pg: 0 },
];

const SERVICES = [
  { t: "Venue sourcing", d: "Banquet, lawn, resort ya palace. Guest count aur budget ke hisaab se shortlist, site visit ke saath.", wide: true },
  { t: "Design aur decoration", d: "Stage, floral aur light setup. Banane se pehle 3D preview dikhate hain." },
  { t: "Catering", d: "Tasting ke baad menu final. Live counters aur Jain, veg, non-veg options." },
  { t: "Photo aur video", d: "Candid, cinematic aur drone. Same-day highlight reel." },
  { t: "Entertainment", d: "DJ, live band, dhol, anchor aur artists, sab ek hi booking mein.", wide: true },
  { t: "Guest management", d: "Invites, RSVP tracking, rooms aur pickup-drop." },
];

const STATS = [
  { n: 500, s: "+", l: "events complete" },
  { n: 8, s: " saal", l: "ka experience" },
  { n: 120, s: "+", l: "verified vendors" },
  { n: 98, s: "%", l: "clients dobara aate hain" },
];

const WORK = [
  { n: "Royal Sangeet Night", c: "Shaadi, 400 guests", g: "linear-gradient(135deg,#dfe6ff,#f3f0ff 60%,#fff)" },
  { n: "Annual Day 2025", c: "Corporate, 800 guests", g: "linear-gradient(135deg,#e6f4ff,#eef2ff 60%,#fff)" },
  { n: "Jungle Theme Party", c: "Birthday, 60 guests", g: "linear-gradient(135deg,#e7f8ee,#f1fbff 60%,#fff)" },
  { n: "Haldi in Marigold", c: "Shaadi, 150 guests", g: "linear-gradient(135deg,#fff1d6,#fff7ea 60%,#fff)" },
  { n: "Product Launch", c: "Corporate, 250 guests", g: "linear-gradient(135deg,#e9e6ff,#f4f2ff 60%,#fff)" },
  { n: "Poolside Anniversary", c: "Social, 80 guests", g: "linear-gradient(135deg,#d8f3f4,#eefbfb 60%,#fff)" },
];

const STEPS = [
  { t: "Baat-cheet", d: "Idea, date aur budget batayein. Pehli consultation free hai." },
  { t: "Plan aur quote", d: "Theme, schedule aur poora kharcha ek likhit document mein." },
  { t: "Booking", d: "Advance dekar date lock. Vendors hum fix karte hain." },
  { t: "Event ka din", d: "Team subah se site par. Aap sirf mehmaano ke saath rahiye." },
];

const REVIEWS = [
  { q: "Poori shaadi mein ek baar bhi tension nahi hui. Har cheez time par thi.", w: "Priya aur Rohit", r: "Shaadi, Jaipur" },
  { q: "Annual function ab tak ka sabse smooth raha. Budget bhi bilkul control mein.", w: "Amit Sharma", r: "HR Manager" },
  { q: "Bete ki birthday ka decor dekh kar sab hairan reh gaye.", w: "Neha Gupta", r: "Birthday" },
];

const FAQ = [
  { q: "Kitne din pehle booking karni chahiye?", a: "Shaadi ke liye 3 se 6 mahine pehle behtar hai. Chhote events 3 se 4 hafte mein bhi ho jaate hain." },
  { q: "Kya budget ke hisaab se plan banta hai?", a: "Haan. Aap budget batate hain, hum usi mein best option dikhate hain. Koi chhupa kharcha nahi." },
  { q: "Kya doosre shehar mein bhi event karte hain?", a: "Haan, destination events bhi karte hain. Travel aur stay ka kharcha quote mein alag likha jaata hai." },
  { q: "Advance kitna dena hota hai?", a: "Aam taur par 30 se 40 percent. Baaki event se pehle do hisson mein." },
];

const inr = (n: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
const wa = (text = "") => `https://wa.me/${BUSINESS.phone}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

/* ============ SMALL COMPONENTS ============ */

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (reduce) return setVal(to);
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / 1400, 1);
          setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

function Spot({ className = "", children }: { className?: string; children: React.ReactNode }) {
  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return <div className={`spot ${className}`} onMouseMove={move}>{children}</div>;
}

function Planner() {
  const [type, setType] = useState(0);
  const [guests, setGuests] = useState(200);
  const [picked, setPicked] = useState<string[]>(["venue", "decor", "catering"]);

  const toggle = (k: string) => setPicked((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));

  const base = PLAN_SERVICES.filter((s) => picked.includes(s.key)).reduce((sum, s) => sum + s.flat + s.pg * guests, 0) * EVENT_TYPES[type].mult;
  const low = Math.round(base * 0.9 / 1000) * 1000;
  const high = Math.round(base * 1.15 / 1000) * 1000;
  const pct = ((guests - 20) / (1000 - 20)) * 100;

  const summary =
    `Namaste ${BUSINESS.name}! Mujhe ${EVENT_TYPES[type].key} event plan karna hai.\n` +
    `Guests: ${guests}\nServices: ${PLAN_SERVICES.filter((s) => picked.includes(s.key)).map((s) => s.label).join(", ") || "Abhi tay nahi"}\n` +
    `Andaaza: ${inr(low)} se ${inr(high)}\nKripya exact quote bhejein.`;

  return (
    <div className="planner" aria-label="Event budget planner">
      <div className="pl-head">
        <b>Apna event plan karein</b>
        <span className="live"><i /> Live andaaza</span>
      </div>

      <div className="pl-label">Event ka type</div>
      <div className="chips" role="radiogroup">
        {EVENT_TYPES.map((e, i) => (
          <button key={e.key} role="radio" aria-checked={i === type} className={i === type ? "chip on" : "chip"} onClick={() => setType(i)}>
            {e.key}
          </button>
        ))}
      </div>

      <div className="pl-label row">
        <span>Guests</span>
        <b>{guests}</b>
      </div>
      <input
        className="range"
        type="range"
        min={20}
        max={1000}
        step={10}
        value={guests}
        aria-label="Guests ki sankhya"
        style={{ ["--p" as string]: `${pct}%` }}
        onChange={(e) => setGuests(+e.target.value)}
      />

      <div className="pl-label">Kya chahiye</div>
      <div className="chips">
        {PLAN_SERVICES.map((s) => (
          <button key={s.key} aria-pressed={picked.includes(s.key)} className={picked.includes(s.key) ? "chip on" : "chip"} onClick={() => toggle(s.key)}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="estimate">
        <span>Andaaza kharcha</span>
        <strong>{picked.length ? `${inr(low)} – ${inr(high)}` : "Koi service chuniye"}</strong>
        <small>Ye sirf shuruaati andaaza hai. Final quote venue aur date par nirbhar karta hai.</small>
      </div>

      <a className="btn full" href={wa(summary)} target="_blank" rel="noreferrer">
        Is plan par exact quote lein
      </a>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={open ? "faq open" : "faq"}>
      <button aria-expanded={open} onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <i aria-hidden="true" />
      </button>
      <div className="faq-body">
        <p>{a}</p>
      </div>
    </div>
  );
}

/* ============ PAGE ============ */

export default function Page() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", type: "Shaadi", date: "", guests: "", msg: "" });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.name.trim() || !form.phone.trim()) {
      alert("Kripya apna naam aur phone number daalein.");
      return;
    }
    const text =
      `Namaste ${BUSINESS.name}!\nNaam: ${form.name}\nPhone: ${form.phone}\nEvent: ${form.type}\n` +
      `Date: ${form.date || "Tay nahi"}\nGuests: ${form.guests || "Pata nahi"}\nDetails: ${form.msg || "-"}`;
    window.open(wa(text), "_blank");
  };

  const nav = [
    ["Services", "#services"],
    ["Kaam", "#work"],
    ["Process", "#process"],
    ["Reviews", "#reviews"],
    ["FAQ", "#faq"],
  ];

  return (
    <div className={`${display.variable} ${body.variable} root`}>
      <style>{css}</style>

      {/* NAV */}
      <header className={scrolled ? "nav scrolled" : "nav"}>
        <div className="nav-in">
          <a href="#top" className="logo">
            <span className="mark" aria-hidden="true" />
            {BUSINESS.name}
            <em>{BUSINESS.tag}</em>
          </a>
          <nav className={menu ? "links open" : "links"}>
            {nav.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setMenu(false)}>{l}</a>
            ))}
            <a href="#contact" className="btn sm" onClick={() => setMenu(false)}>Free quote</a>
          </nav>
          <button className="burger" aria-label="Menu kholein" aria-expanded={menu} onClick={() => setMenu(!menu)}>
            <span /><span />
          </button>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="grid-bg" aria-hidden="true" />
          <div className="orb o1" aria-hidden="true" />
          <div className="orb o2" aria-hidden="true" />
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <p className="pill"><i /> {BUSINESS.city} ki event studio</p>
              <h1>Event jo dikhe premium, chale bina rukawat ke.</h1>
              <p className="lead">
                Shaadi, corporate event ya birthday, planning se lekar last guest ki vidaai tak hum poora kaam sambhalte hain. Aap bas mehmaano ke saath rahiye.
              </p>
              <div className="cta-row">
                <a href="#contact" className="btn">Free quote paayein</a>
                <a href="#work" className="btn ghost">Hamara kaam dekhein</a>
              </div>
              <div className="trust">
                <div className="avatars" aria-hidden="true">
                  <span /><span /><span /><span />
                </div>
                <p>500+ khush parivaar aur companies ne humein chuna</p>
              </div>
            </div>
            <Planner />
          </div>
        </section>

        {/* MARQUEE */}
        <div className="marquee" aria-hidden="true">
          <div className="track">
            {[...Array(2)].map((_, k) => (
              <div className="seq" key={k}>
                {["Shaadi", "Sangeet", "Mehendi", "Haldi", "Corporate Launch", "Conference", "Birthday", "Anniversary", "Roka", "Godh Bharai", "Destination Wedding"].map((t) => (
                  <span key={t + k}>{t}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* STATS */}
        <section className="stats wrap">
          {STATS.map((s) => (
            <div key={s.l}>
              <b><CountUp to={s.n} suffix={s.s} /></b>
              <span>{s.l}</span>
            </div>
          ))}
        </section>

        {/* SERVICES */}
        <section id="services" className="sec">
          <div className="wrap">
            <div className="sec-head">
              <h2>Poora event, ek hi team ke haath mein</h2>
              <p>Alag-alag vendors ke peeche bhaagne ki zaroorat nahi. Ek point of contact, ek hi quote.</p>
            </div>
            <div className="bento">
              {SERVICES.map((s) => (
                <Spot key={s.t} className={s.wide ? "card wide" : "card"}>
                  <div className="icon" aria-hidden="true" />
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </Spot>
              ))}
            </div>
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="sec soft">
          <div className="wrap">
            <div className="sec-head">
              <h2>Kuch events jo humne banaye</h2>
              <p>Asli photos lagane ke liye <code>g:</code> ki jagah <code>url(/photo.jpg) center/cover</code> likhiye.</p>
            </div>
            <div className="work">
              {WORK.map((w, i) => (
                <figure key={w.n} className={i === 0 || i === 3 ? "tall" : ""} style={{ background: w.g }}>
                  <div className="work-mesh" aria-hidden="true" />
                  <figcaption>
                    <b>{w.n}</b>
                    <span>{w.c}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="sec">
          <div className="wrap">
            <div className="sec-head">
              <h2>Chaar kadam mein aapka event</h2>
              <p>Har step par aapko pata hota hai ki kya ho raha hai aur kitna kharcha hai.</p>
            </div>
            <ol className="steps">
              {STEPS.map((s, i) => (
                <li key={s.t}>
                  <span className="num">{i + 1}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* REVIEWS */}
        <section id="reviews" className="sec soft">
          <div className="wrap">
            <div className="sec-head">
              <h2>Clients ki zubaani</h2>
            </div>
            <div className="reviews">
              {REVIEWS.map((r) => (
                <Spot key={r.w} className="card review">
                  <p className="stars" aria-label="5 star">★★★★★</p>
                  <blockquote>{r.q}</blockquote>
                  <div className="who">
                    <span className="av" aria-hidden="true">{r.w[0]}</span>
                    <div>
                      <b>{r.w}</b>
                      <small>{r.r}</small>
                    </div>
                  </div>
                </Spot>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="sec">
          <div className="wrap faq-wrap">
            <div className="sec-head left">
              <h2>Aksar puche jaane wale sawaal</h2>
              <p>Aur koi sawaal ho to seedha WhatsApp par poochhiye.</p>
              <a className="btn ghost" href={wa()} target="_blank" rel="noreferrer">WhatsApp par poochhein</a>
            </div>
            <div className="faq-list">
              {FAQ.map((f) => (
                <FaqItem key={f.q} {...f} />
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="sec soft">
          <div className="wrap contact">
            <div>
              <h2>Apne event ke baare mein batayein</h2>
              <p className="sub">Form bharte hi WhatsApp khulega aur details hum tak pahunch jayengi. Hum usi din jawab dete hain.</p>
              <ul className="info">
                <li><span>Phone</span><a href={`tel:+${BUSINESS.phone}`}>{BUSINESS.phoneShow}</a></li>
                <li><span>Email</span><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></li>
                <li><span>Instagram</span><a href={BUSINESS.instagram} target="_blank" rel="noreferrer">Hamara kaam dekhein</a></li>
                <li><span>Shehar</span>{BUSINESS.city}</li>
              </ul>
            </div>
            <div className="form">
              <label>Aapka naam
                <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Jaise: Rahul Verma" />
              </label>
              <label>Phone number
                <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="10 digit number" />
              </label>
              <div className="two">
                <label>Event ka type
                  <select value={form.type} onChange={(e) => set("type", e.target.value)}>
                    {EVENT_TYPES.map((e) => <option key={e.key}>{e.key}</option>)}
                  </select>
                </label>
                <label>Date
                  <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} />
                </label>
              </div>
              <label>Kitne guests
                <input value={form.guests} onChange={(e) => set("guests", e.target.value)} placeholder="Jaise: 200" />
              </label>
              <label>Kuch aur batana chahein
                <textarea rows={3} value={form.msg} onChange={(e) => set("msg", e.target.value)} placeholder="Budget, venue, theme..." />
              </label>
              <button className="btn full" onClick={submit}>WhatsApp par bhejein</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap foot">
          <div className="logo"><span className="mark" aria-hidden="true" />{BUSINESS.name}</div>
          <span>© {new Date().getFullYear()} {BUSINESS.name}. Sabhi adhikar surakshit.</span>
        </div>
      </footer>

      <a className="float" href={wa()} target="_blank" rel="noreferrer" aria-label="WhatsApp par chat karein">
        Chat karein
      </a>
    </div>
  );
}

/* ============ STYLES ============ */

const css = `
:root{
  --bg:#ffffff; --soft:#f6f7fb; --ink:#0b0d17; --mute:#5b6075; --line:#e6e8f0;
  --brand:#3555ff; --brand-2:#7c5cff; --glow:rgba(53,85,255,.18);
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;scroll-padding-top:80px}
body{background:#fff}
.root{font-family:var(--f-body),system-ui,sans-serif;color:var(--ink);background:var(--bg);line-height:1.6;overflow-x:hidden;-webkit-font-smoothing:antialiased}
h1,h2,h3,.logo,.planner strong,.stats b{font-family:var(--f-display),system-ui,sans-serif;letter-spacing:-.02em}
a{color:inherit}
.wrap{max-width:1180px;margin:0 auto;padding:0 24px}
:focus-visible{outline:3px solid var(--brand);outline-offset:3px;border-radius:6px}
code{background:var(--soft);border:1px solid var(--line);padding:1px 6px;border-radius:6px;font-size:.85em}

/* buttons */
.btn{display:inline-flex;justify-content:center;align-items:center;background:var(--ink);color:#fff;padding:14px 26px;border-radius:14px;border:0;font:600 1rem var(--f-body),sans-serif;text-decoration:none;cursor:pointer;transition:transform .2s,box-shadow .2s,background .2s;box-shadow:0 8px 24px -8px rgba(11,13,23,.5)}
.btn:hover{transform:translateY(-2px);background:var(--brand);box-shadow:0 14px 30px -10px var(--glow)}
.btn.sm{padding:9px 18px;font-size:.92rem;border-radius:10px}
.btn.full{width:100%}
.btn.ghost{background:#fff;color:var(--ink);border:1px solid var(--line);box-shadow:none}
.btn.ghost:hover{background:var(--soft);transform:translateY(-2px);box-shadow:none}

/* nav */
.nav{position:fixed;inset:0 0 auto 0;z-index:50;transition:background .3s,border-color .3s,backdrop-filter .3s;border-bottom:1px solid transparent}
.nav.scrolled{background:rgba(255,255,255,.78);backdrop-filter:saturate(180%) blur(16px);border-color:var(--line)}
.nav-in{max-width:1180px;margin:0 auto;padding:14px 24px;display:flex;justify-content:space-between;align-items:center}
.logo{display:flex;align-items:center;gap:10px;font-weight:700;font-size:1.15rem;text-decoration:none}
.logo em{font-style:normal;font-weight:400;font-size:.85rem;color:var(--mute);border-left:1px solid var(--line);padding-left:10px}
.mark{width:26px;height:26px;border-radius:8px;background:conic-gradient(from 200deg,var(--brand),var(--brand-2),#22d3ee,var(--brand));box-shadow:0 4px 14px -2px var(--glow)}
.links{display:flex;align-items:center;gap:28px}
.links a:not(.btn){text-decoration:none;font-size:.95rem;color:var(--mute);transition:color .2s}
.links a:not(.btn):hover{color:var(--ink)}
.burger{display:none;width:42px;height:42px;border:1px solid var(--line);border-radius:12px;background:#fff;cursor:pointer;position:relative}
.burger span{position:absolute;left:11px;right:11px;height:2px;background:var(--ink);border-radius:2px;transition:transform .25s}
.burger span:first-child{top:16px}
.burger span:last-child{top:24px}
.burger[aria-expanded="true"] span:first-child{transform:translateY(4px) rotate(45deg)}
.burger[aria-expanded="true"] span:last-child{transform:translateY(-4px) rotate(-45deg)}

/* hero */
.hero{position:relative;padding:150px 0 70px;overflow:hidden}
.grid-bg{position:absolute;inset:0;background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:56px 56px;mask-image:radial-gradient(ellipse 70% 60% at 50% 30%,#000 30%,transparent 80%);-webkit-mask-image:radial-gradient(ellipse 70% 60% at 50% 30%,#000 30%,transparent 80%);opacity:.7}
.orb{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none}
.o1{width:420px;height:420px;background:rgba(53,85,255,.22);top:-80px;left:-120px}
.o2{width:380px;height:380px;background:rgba(124,92,255,.18);top:120px;right:-100px}
.hero-grid{position:relative;display:grid;grid-template-columns:1.1fr .9fr;gap:56px;align-items:center}
.pill{display:inline-flex;align-items:center;gap:8px;font-size:.88rem;font-weight:500;padding:7px 14px;border-radius:999px;background:#fff;border:1px solid var(--line);box-shadow:0 2px 10px rgba(11,13,23,.04);margin-bottom:22px}
.pill i{width:8px;height:8px;border-radius:50%;background:#22c55e;box-shadow:0 0 0 4px rgba(34,197,94,.2)}
.hero h1{font-size:clamp(2.4rem,5.2vw,4.1rem);line-height:1.08;font-weight:700;animation:rise .8s cubic-bezier(.2,.7,.2,1) both}
.lead{font-size:1.15rem;color:var(--mute);max-width:32em;margin:22px 0 30px;animation:rise .8s .1s cubic-bezier(.2,.7,.2,1) both}
.cta-row{display:flex;gap:12px;flex-wrap:wrap;animation:rise .8s .2s cubic-bezier(.2,.7,.2,1) both}
.trust{display:flex;align-items:center;gap:14px;margin-top:34px;color:var(--mute);font-size:.92rem}
.avatars{display:flex}
.avatars span{width:34px;height:34px;border-radius:50%;border:2px solid #fff;margin-left:-10px;background:linear-gradient(135deg,var(--brand),var(--brand-2))}
.avatars span:first-child{margin-left:0}
.avatars span:nth-child(2){background:linear-gradient(135deg,#22d3ee,var(--brand))}
.avatars span:nth-child(3){background:linear-gradient(135deg,#f59e0b,#f43f5e)}
.avatars span:nth-child(4){background:linear-gradient(135deg,#10b981,#22d3ee)}
@keyframes rise{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}

/* planner */
.planner{position:relative;background:rgba(255,255,255,.85);backdrop-filter:blur(18px);border:1px solid var(--line);border-radius:24px;padding:26px;box-shadow:0 30px 70px -30px rgba(53,85,255,.35),0 2px 0 #fff inset;animation:rise .9s .15s cubic-bezier(.2,.7,.2,1) both}
.planner::before{content:"";position:absolute;inset:-1px;border-radius:25px;padding:1px;background:linear-gradient(140deg,rgba(53,85,255,.5),transparent 40%,rgba(124,92,255,.4));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
.pl-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
.pl-head b{font-family:var(--f-display),sans-serif;font-size:1.1rem}
.live{display:inline-flex;align-items:center;gap:7px;font-size:.8rem;color:var(--mute)}
.live i{width:7px;height:7px;border-radius:50%;background:var(--brand);animation:pulse 1.8s infinite}
@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(53,85,255,.5)}100%{box-shadow:0 0 0 9px rgba(53,85,255,0)}}
.pl-label{font-size:.88rem;color:var(--mute);margin:16px 0 8px;font-weight:500}
.pl-label.row{display:flex;justify-content:space-between}
.pl-label.row b{color:var(--ink);font-size:1rem}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chip{padding:8px 15px;border-radius:10px;border:1px solid var(--line);background:#fff;font:500 .9rem var(--f-body),sans-serif;color:var(--ink);cursor:pointer;transition:all .2s}
.chip:hover{border-color:var(--brand)}
.chip.on{background:var(--ink);color:#fff;border-color:var(--ink);box-shadow:0 6px 16px -6px rgba(11,13,23,.5)}
.range{-webkit-appearance:none;appearance:none;width:100%;height:6px;border-radius:6px;background:linear-gradient(90deg,var(--brand) var(--p),var(--line) var(--p));outline-offset:6px;cursor:pointer}
.range::-webkit-slider-thumb{-webkit-appearance:none;width:22px;height:22px;border-radius:50%;background:#fff;border:2px solid var(--brand);box-shadow:0 4px 12px var(--glow)}
.range::-moz-range-thumb{width:20px;height:20px;border-radius:50%;background:#fff;border:2px solid var(--brand)}
.estimate{margin:22px 0 16px;padding:16px 18px;border-radius:16px;background:linear-gradient(135deg,#f3f5ff,#f8f5ff);border:1px solid #e3e7ff;display:flex;flex-direction:column;gap:2px}
.estimate span{font-size:.85rem;color:var(--mute)}
.estimate strong{font-size:1.45rem;font-weight:700;color:var(--ink)}
.estimate small{color:var(--mute);font-size:.78rem;line-height:1.4;margin-top:4px}

/* marquee + stats */
.marquee{border-block:1px solid var(--line);background:#fff;overflow:hidden;padding:18px 0}
.track{display:flex;width:max-content;animation:slide 40s linear infinite}
.seq{display:flex;gap:44px;padding-right:44px}
.seq span{font:600 1.05rem var(--f-display),sans-serif;color:#9aa0b5;white-space:nowrap}
@keyframes slide{to{transform:translateX(-50%)}}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;padding-block:64px}
.stats div{display:flex;flex-direction:column;gap:2px;padding-left:18px;border-left:2px solid var(--line)}
.stats b{font-size:clamp(2rem,4vw,2.9rem);font-weight:700;background:linear-gradient(135deg,var(--ink),var(--brand));-webkit-background-clip:text;background-clip:text;color:transparent}
.stats span{color:var(--mute);font-size:.95rem}

/* sections */
.sec{padding:96px 0}
.sec.soft{background:var(--soft)}
.sec-head{max-width:620px;margin-bottom:48px}
.sec-head.left{margin-bottom:0}
.sec-head h2,.contact h2{font-size:clamp(1.8rem,3.6vw,2.7rem);line-height:1.15;font-weight:700}
.sec-head p,.sub{color:var(--mute);margin-top:14px;font-size:1.05rem}
.sec-head .btn{margin-top:22px}

/* spotlight cards */
.spot{--mx:50%;--my:50%;position:relative;background:#fff;border:1px solid var(--line);border-radius:22px;padding:28px;overflow:hidden;transition:transform .3s,box-shadow .3s}
.spot::before{content:"";position:absolute;inset:0;background:radial-gradient(360px circle at var(--mx) var(--my),rgba(53,85,255,.10),transparent 60%);opacity:0;transition:opacity .3s;pointer-events:none}
.spot:hover{transform:translateY(-4px);box-shadow:0 24px 50px -24px rgba(53,85,255,.35)}
.spot:hover::before{opacity:1}
.bento{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.card.wide{grid-column:span 2}
.card h3{font-size:1.2rem;margin:18px 0 8px;position:relative}
.card p{color:var(--mute);position:relative;max-width:34em}
.icon{width:44px;height:44px;border-radius:13px;background:linear-gradient(135deg,#eef1ff,#f6f1ff);border:1px solid #e0e5ff;position:relative}
.icon::after{content:"";position:absolute;inset:12px;border-radius:5px;background:linear-gradient(135deg,var(--brand),var(--brand-2))}

/* work */
.work{display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:210px;gap:18px}
.work figure{position:relative;border-radius:22px;border:1px solid var(--line);overflow:hidden;display:flex;align-items:flex-end;background-size:cover;background-position:center;transition:transform .35s}
.work figure.tall{grid-row:span 2}
.work figure:hover{transform:scale(1.015)}
.work-mesh{position:absolute;inset:0;background-image:linear-gradient(rgba(11,13,23,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(11,13,23,.05) 1px,transparent 1px);background-size:32px 32px}
.work figcaption{position:relative;margin:14px;padding:12px 16px;border-radius:14px;background:rgba(255,255,255,.82);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.9);display:flex;flex-direction:column}
.work figcaption span{font-size:.85rem;color:var(--mute)}

/* process */
.steps{list-style:none;display:grid;grid-template-columns:repeat(4,1fr);gap:24px;position:relative}
.steps::before{content:"";position:absolute;top:22px;left:22px;right:22px;height:2px;background:linear-gradient(90deg,var(--brand),var(--brand-2),var(--line))}
.steps li{position:relative}
.num{position:relative;display:grid;place-items:center;width:46px;height:46px;border-radius:50%;background:#fff;border:2px solid var(--brand);font:700 1.05rem var(--f-display),sans-serif;color:var(--brand);box-shadow:0 0 0 6px #fff}
.steps h3{margin:18px 0 6px;font-size:1.15rem}
.steps p{color:var(--mute);font-size:.95rem}

/* reviews */
.reviews{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.review{display:flex;flex-direction:column;gap:14px}
.stars{color:#f59e0b;letter-spacing:2px;position:relative}
.review blockquote{font:600 1.1rem/1.5 var(--f-display),sans-serif;letter-spacing:-.01em;position:relative;flex:1}
.who{display:flex;align-items:center;gap:12px;position:relative}
.who b{display:block;font-size:.95rem}
.who small{color:var(--mute)}
.av{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;color:#fff;font-weight:700;background:linear-gradient(135deg,var(--brand),var(--brand-2))}

/* faq */
.faq-wrap{display:grid;grid-template-columns:.8fr 1.2fr;gap:56px;align-items:start}
.faq-list{display:flex;flex-direction:column;gap:12px}
.faq{border:1px solid var(--line);border-radius:18px;background:#fff;overflow:hidden;transition:border-color .2s,box-shadow .2s}
.faq.open{border-color:#cdd5ff;box-shadow:0 14px 30px -20px var(--glow)}
.faq button{width:100%;display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 22px;background:none;border:0;text-align:left;font:600 1.02rem var(--f-body),sans-serif;color:var(--ink);cursor:pointer}
.faq i{flex:none;width:22px;height:22px;position:relative}
.faq i::before,.faq i::after{content:"";position:absolute;left:3px;right:3px;top:10px;height:2px;background:var(--ink);border-radius:2px;transition:transform .25s}
.faq i::after{transform:rotate(90deg)}
.faq.open i::after{transform:rotate(0)}
.faq-body{display:grid;grid-template-rows:0fr;transition:grid-template-rows .3s ease}
.faq.open .faq-body{grid-template-rows:1fr}
.faq-body p{overflow:hidden;padding:0 22px;color:var(--mute)}
.faq.open .faq-body p{padding-bottom:20px}

/* contact */
.contact{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:start}
.info{list-style:none;margin-top:30px;display:grid;gap:0;border-top:1px solid var(--line)}
.info li{display:flex;gap:18px;padding:16px 0;border-bottom:1px solid var(--line)}
.info li span{width:90px;color:var(--mute)}
.info a{text-decoration:underline;text-underline-offset:4px;text-decoration-color:var(--line)}
.info a:hover{text-decoration-color:var(--brand)}
.form{background:#fff;border:1px solid var(--line);border-radius:24px;padding:28px;display:grid;gap:16px;box-shadow:0 30px 60px -40px rgba(11,13,23,.3)}
.form label{display:grid;gap:6px;font-weight:500;font-size:.92rem}
.form input,.form select,.form textarea{font:400 1rem var(--f-body),sans-serif;padding:12px 14px;border:1px solid var(--line);border-radius:12px;background:var(--soft);color:var(--ink);width:100%;transition:border-color .2s,background .2s,box-shadow .2s}
.form input:focus,.form select:focus,.form textarea:focus{outline:none;border-color:var(--brand);background:#fff;box-shadow:0 0 0 4px var(--glow)}
.two{display:grid;grid-template-columns:1fr 1fr;gap:14px}

/* footer + float */
.footer{border-top:1px solid var(--line);padding:30px 0;color:var(--mute);font-size:.92rem}
.foot{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
.foot .logo{color:var(--ink)}
.float{position:fixed;right:18px;bottom:18px;z-index:40;background:#fff;color:var(--ink);font-weight:600;text-decoration:none;padding:12px 20px;border-radius:14px;border:1px solid var(--line);box-shadow:0 14px 34px -12px rgba(11,13,23,.35);display:inline-flex;align-items:center;gap:10px}
.float::before{content:"";width:9px;height:9px;border-radius:50%;background:#22c55e;box-shadow:0 0 0 4px rgba(34,197,94,.2)}

/* responsive */
@media (max-width:980px){
  .hero-grid,.contact,.faq-wrap{grid-template-columns:1fr}
  .stats{grid-template-columns:repeat(2,1fr)}
  .bento,.reviews{grid-template-columns:1fr 1fr}
  .card.wide{grid-column:span 2}
  .work{grid-template-columns:1fr 1fr}
  .steps{grid-template-columns:1fr 1fr;row-gap:36px}
  .steps::before{display:none}
}
@media (max-width:700px){
  .burger{display:block}
  .links{display:none;position:absolute;top:100%;left:12px;right:12px;flex-direction:column;align-items:stretch;gap:4px;padding:14px;background:#fff;border:1px solid var(--line);border-radius:18px;box-shadow:0 24px 50px -20px rgba(11,13,23,.3)}
  .links.open{display:flex}
  .links a:not(.btn){padding:12px 10px}
  .logo em{display:none}
  .hero{padding-top:120px}
  .sec{padding:68px 0}
  .bento,.reviews,.work,.steps,.two{grid-template-columns:1fr}
  .card.wide{grid-column:auto}
  .work{grid-auto-rows:190px}
  .work figure.tall{grid-row:auto}
  .info li span{width:76px}
}
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
}
`;