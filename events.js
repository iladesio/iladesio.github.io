/* =====================================================================
   EVENTS DATA — single source of truth for the portfolio + activities page
   Edit this list to add / change activities. Newest FIRST (top of list).
   Each event:
     role:  "Organizer" | "Speaker" | "Attendee"   (drives the accent colour)
     title, type, place, date  — strings (date can be a year or a range)
     desc:  short description
     href:  link to the activity (leave "#" if none yet — card still works)
     img:   cover image path (leave "" to show an on-brand placeholder)
   ===================================================================== */
window.EVENTS = [
  {
    role: "Organizer",
    title: "IGDA Campania — Game Night",
    type: "",
    place: "Naples, IT",
    date: "28 June 2026",
    desc: "Founder and host of recurring meetups connecting Southern Italy's game developers, students and studios.",
    href: "#",
    img: "assets/igda-game-night.png"
  },
  {
    role: "Partecipant",
    title: "International Summer School on AI and Games 2026",
    type: "",
    place: "Leiden, Netherlands",
    date: "15-19 June 2026",
    desc: "Joining to push the synergy between computer vision, AI agents and game development.",
    href: "#",
    img: "assets/summerschool-2026.png"
  },
  {
    role: "Speaker",
    title: "GOSS — More Than a Degree: Life After Graduation",
    type: "Podcast · GOSS Discord",
    place: "Online",
    date: "31 May 2026",
    desc: "Guest on the GOSS podcast for an open conversation on the scary transition to post-university life and on normalizing failure as part of the journey. GOSS builds a safe space for young women, breaking gender barriers and encouraging more girls into STEM.",
    href: "#",
    img: "assets/goss-podcast.png"
  },
  {
    role: "Organizer",
    title: "IGDA × UniSA — Against Stereotypes",
    type: "Panel · University of Salerno, IT",
    place: "",
    date: "18 March 2026",
    desc: "An off-the-script panel on stereotypes and creativity in gaming: women's perspectives on building a career in the industry, across creativity and production. Co-hosted by IGDA Campania and the University of Salerno.",
    href: "https://www.eventbrite.it/e/igda-campania-x-unisa-oltre-gli-stereotipi-tickets-1984276571641",
    img: "assets/igda-unisa-oltre-stereotipi.jpg"
  },
  {
    role: "Speaker",
    title: "LEADersinSTEM — Coding Girls",
    type: "Coding Girls · University of Salerno",
    place: "",
    date: "15 March 2026",
    desc: "Spoke as a STEM woman at Coding Girls (Mondo Digitale), a program advancing equal opportunities in science and tech — fighting gender stereotypes, peer training, female empowerment and mentoring, connecting students with role models to inspire future STEM careers.",
    href: "https://www.mondodigitale.org/en/projects/coding-girls",
    img: "assets/coding-girls.png"
  },
  {
    role: "Partecipant",
    title: "Zagarolo Game City 2025",
    type: "Accelerator · Lazio Innova",
    place: "Zagarolo, IT",
    date: "Oct 2025",
    desc: "PuzzleBlock was selected for the game-design accelerator promoted by Lazio Innova — a program of expert-led sessions to grow the project, build a local dev community and promote game design as a driver of economic and entrepreneurial development.",
    href: "#",
    img: "assets/zagarolo-game-city-2025.jpg"
  },
  {
    role: "Partecipant",
    title: "Creative Valley — Acceleration Program on Gaming",
    type: "Accelerator · with Bamboo Innovation Studio",
    place: "Naples, IT",
    date: "Sept 2025",
    desc: "Selected with startup Bamboo Innovation Studio for Creative Valley's Business & Tech Acceleration Program on Gaming — an intensive program pairing studios with tutors and industry leaders to grow their projects.",
    href: "#",
    img: "assets/creative-valley-2025.jpg"
  },
  {
    role: "Partecipant",
    title: "NASA Space Apps Challenge Rome 2024",
    type: "Hackathon",
    place: "Rome, IT",
    date: "Oct 2024",
    desc: "The world's largest annual hackathon: teams use NASA's open data to build solutions to real challenges on Earth and in space over a single weekend.",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7118207598020952065/",
    img: "assets/nasa-spaceapps-rome.jpg"
  },
  {
    role: "Speaker",
    title: "AllDigital Summit — Brussels",
    type: "Digital inclusion summit",
    place: "Brussels, BE",
    date: "May 2024",
    desc: "Presented our accessibility project to digital-world stakeholders: sonifying space videos into audio so blind and low-vision audiences can experience space — making the cosmos truly accessible to all.",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7196855847182864384/",
    img: "assets/alldigital-brussels.jpg"
  }
];

window.EVENT_ROLE = {
  Organizer:   { c: "var(--cyan)",   soft: "rgba(52,216,238,0.16)",  glow: "rgba(52,216,238,0.50)" },
  Speaker:     { c: "var(--violet)", soft: "rgba(176,124,255,0.16)", glow: "rgba(176,124,255,0.50)" },
  Partecipant: { c: "var(--violet)", soft: "rgba(176,124,255,0.16)", glow: "rgba(176,124,255,0.50)" },
  Attendee:    { c: "var(--blue)",   soft: "rgba(91,157,255,0.16)",  glow: "rgba(91,157,255,0.50)" }
};

(function () {
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // Returns the HTML string for one event card.
  // opts.clamp = number of description lines (0 hides the description).
  window.eventCardHTML = function (e, opts) {
    opts = opts || {};
    const clamp = opts.clamp == null ? 3 : opts.clamp;
    const r = window.EVENT_ROLE[e.role] || window.EVENT_ROLE.Organizer;
    const ext = e.href && e.href !== "#";
    const isLogo = e.img && /icon|logo/i.test(e.img);
    const media = e.img
      ? `<img src="${esc(e.img)}" alt="" class="absolute inset-0 w-full h-full" style="object-fit:${isLogo ? "contain" : "cover"};${isLogo ? "padding:22%;" : ""}">`
      : `<div class="absolute inset-0 ph-stripes flex items-center justify-center" style="background:${r.soft}">
           <span class="display font-semibold tracking-tight" style="font-size:24px;color:${r.c};opacity:.85">${esc(e.role)}</span>
         </div>`;
    const desc = clamp > 0
      ? `<p class="text-[14px] leading-relaxed text-[color:var(--muted)] font-light mt-3" style="display:-webkit-box;-webkit-line-clamp:${clamp};-webkit-box-orient:vertical;overflow:hidden">${esc(e.desc)}</p>`
      : "";
    const meta = [e.type, e.place].map(s => (s || "").trim()).filter(s => s && s !== "—").join(" · ");
    return `
    <a href="${esc(e.href || "#")}"${ext ? ' target="_blank" rel="noopener"' : ""} class="ev-card pcard glass flex flex-col group" style="border-radius:18px">
      <div class="glow" style="box-shadow:0 0 0 1px ${r.glow}, 0 26px 60px -22px ${r.glow}; border-radius:18px"></div>
      <div class="thumb relative overflow-hidden" style="aspect-ratio:16/10; background:var(--bg-2); border-radius:18px 18px 0 0">
        ${media}
        <span class="absolute top-3 left-3 mono text-[11px] px-2.5 py-1 rounded-full" style="background:rgba(7,8,14,0.6);border:1px solid var(--border);color:${r.c}">${esc(e.role)}</span>
      </div>
      <div class="relative z-10 p-5 flex flex-col flex-1">
        <div class="mono text-[12px] text-[color:var(--dim)]">${esc(e.date)}</div>
        <h3 class="display font-semibold text-[20px] leading-[1.12] tracking-tight mt-2 group-hover:translate-x-0.5 transition-transform">${esc(e.title)}</h3>
        <div class="mono text-[11px] text-[color:var(--dim)] mt-2">${esc(meta)}</div>
        ${desc}
        <span class="mt-4 inline-flex items-center gap-2 mono text-[12px]" style="color:${r.c}">View ${ext ? "↗" : "→"} <span class="group-hover:translate-x-1 transition-transform"></span></span>
      </div>
    </a>`;
  };
})();
