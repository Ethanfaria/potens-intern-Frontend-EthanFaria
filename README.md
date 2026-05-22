# Operations Cockpit Dashboard

A senior operations dashboard built for the Potens Frontend internship assignment. Designed to be the first thing an ops manager opens at 9 AM — giving them a clear picture of what needs action, what's broken, and how much time they have left.

---

## How to Run

**Prerequisites:** Node.js 18+ and npm

```bash
# Clone the repo
git clone https://github.com/Ethanfaria/potens-intern-Frontend-EthanFaria.git
cd potens-intern-Frontend-EthanFaria

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open `http://localhost:5173` in your browser.

**Production build:**
```bash
npm run build
npm run preview
```

---

## What's Inside

| Panel | What it does |
|---|---|
| **Action Items** | Top 5 prioritised items (P1→P3) with approve / hold actions and keyboard navigation |
| **Anomalies** | Auto-flagged system anomalies with severity, source, and business impact |
| **Live Metrics** | SLA breach countdown ticking to 21:00, vehicles off-radar, payments queued |

---

## Design Decisions

**Single scrollable page, not tabs.**
The brief said "opens at 9 AM before the day starts." That implies a scan, not navigation. All three panels are on one page with scroll-spy updating the sidebar highlight. The sidebar nav jumps to sections; it doesn't swap views.

**Priority-coded left borders instead of icons.**
Red/amber/slate left borders on rows give the eye an immediate severity read without needing to parse text or icons. Borrowed from how terminal logs and Jira-style boards work in practice.

**Keyboard shortcuts on desktop.**
`j`/`k` to move focus, `a` to approve, `h` to hold. This is a power-user dashboard — an ops manager who uses it every day should never need to reach for the mouse. The focused row gets a teal ring so the current item is always obvious.

**Three responsive breakpoints, not two.**
Mobile, tablet, and desktop each get a different layout (card stack → compact table → full grid). The brief said "desktop-optimised, responsive on tablet" — I treated mobile as a bonus rather than primary, which is why the mobile layout is simpler.

**Dark mode persisted in `localStorage`.**
The toggle survives a page refresh. Most dashboards reset to light on reload, which is jarring if you work in dark mode. One line of `localStorage` read on init, one write on toggle.

**Low-bandwidth mode as a real layout change, not just a CSS class.**
When enabled: the sidebar collapses to an icon-only rail, the topbar shrinks, context text and timestamps are hidden, padding is reduced, and animated/blur effects are stripped. The intent is a usable dashboard on a 2G connection or a low-end device — not just a visual toggle.

**Hindi translation as a static object.**
The brief required a bilingual toggle. I used a `translations` object with AI-generated Hindi strings rather than a live translation API (Google Translate API is paid). The toggle is instant with no network dependency, which is actually better for a low-bandwidth context. All UI strings are covered; data fields (titles, descriptions in mock data) remain in English since those would come from a backend in a real system.

**Teal/cyan palette.**
Operations dashboards trend toward grey and blue. Teal reads as "active and monitored" without the clinical coldness of pure blue or the alarm-fatigue of red as a primary colour. Red and amber are reserved strictly for urgency signals so they retain meaning.

---

## What's Broken or Unfinished

**Action states don't persist on refresh.**
Approve/hold decisions live in React state. Refreshing the page resets everything. In production this would write to a backend; as a mock dashboard, `localStorage` would have been a reasonable interim fix but I didn't get to it.

**Low-bandwidth mode doesn't drop images.**
The brief mentions "drops images" as part of the low-BW toggle. The dashboard currently has no images (no avatar photos, no product images), so there's nothing to drop. The layout and content density changes are implemented correctly, but the image-stripping behaviour has no surface to demonstrate on.

**Hindi translation covers UI strings only.**
The mock data (item titles, anomaly descriptions, context lines) stays in English regardless of language. A real implementation would either translate the data server-side or run it through a translation API. The static approach was a deliberate trade-off given time and cost constraints.

**No error boundaries.**
If a context fails to initialise or mock data is malformed, the whole app will crash to a blank screen. Production dashboards need error boundaries and fallback UI.

---

## What I'd Build Next

**Account settings panel.**
The sidebar footer shows a user avatar and "Admin Access" but there's no actual settings page. Next up would be a panel for profile, notification preferences, and role/access management.

**Real translation via API.**
Replace the static `translations` object with Google Cloud Translation or DeepL. The architecture is already set up for it — `LangContext` has a `loading` flag ready, and the toggle just needs to become async. Held back only because it's a paid API.

**Persistent action log.**
Every approve/hold decision should write to a backend (or at minimum `localStorage`) with a timestamp and user ID. The dashboard should show a "resolved today" history, not just a counter.

---

## AI Use Log

| Tool | Approx. usage | What I used it for |
|---|---|---|
| **Claude (claude.ai)** | ~100 messages | Initial project scoping and deciding what to build; generating the complete `translations` object (all Hindi strings); generating realistic mock data for `actionItems` and `anomalies`; writing this README |
| **GitHub Copilot** | Passive, throughout | Inline autocomplete while writing component logic and Tailwind class strings |

> All architecture decisions, component structure, layout logic, responsive breakpoints, keyboard navigation, context design, and dark mode implementation were written by hand. AI was used for content generation (translations, mock data) and as a sounding board for the initial brief, not for writing the application code.