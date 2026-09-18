const header = document.querySelector(".site-header");
const revealTargets = document.querySelectorAll(".reveal");

const updateHeader = () => {
  header.dataset.elevated = window.scrollY > 16 ? "true" : "false";
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
);

revealTargets.forEach((target) => observer.observe(target));
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

/* ------------------------------------------------------------------
   Hero chart: chain-ladder development curves.

   TRIANGLE is a cumulative paid-claims run-off triangle (£000),
   one row per accident year, one column per development year.
   It is illustrative. Replace it with a real (anonymised or scaled)
   triangle from a project and the chart, factors and projections
   update automatically.
   ------------------------------------------------------------------ */

const TRIANGLE = {
  firstYear: 2019,
  rows: [
    [1200, 2100, 2650, 2950, 3100, 3180],
    [1350, 2380, 2990, 3320, 3480],
    [1420, 2500, 3150, 3500],
    [1500, 2660, 3340],
    [1610, 2830],
    [1700],
  ],
};

const chainLadder = (rows) => {
  const n = rows[0].length;
  const factors = [];
  for (let k = 0; k < n - 1; k += 1) {
    let num = 0;
    let den = 0;
    rows.forEach((row) => {
      if (row.length > k + 1) {
        num += row[k + 1];
        den += row[k];
      }
    });
    factors.push(num / den);
  }
  const projected = rows.map((row) => {
    const full = row.slice();
    for (let k = row.length; k < n; k += 1) {
      full.push(full[k - 1] * factors[k - 1]);
    }
    return full;
  });
  return { factors, projected };
};

const renderHeroChart = () => {
  const svg = document.getElementById("hero-chart");
  if (!svg) return;

  const NS = "http://www.w3.org/2000/svg";
  const el = (name, attrs, text) => {
    const node = document.createElementNS(NS, name);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const { rows, firstYear } = TRIANGLE;
  const { projected } = chainLadder(rows);
  const n = rows[0].length;

  const width = 560;
  const height = 380;
  const pad = { top: 22, right: 96, bottom: 46, left: 54 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const maxY = Math.max(...projected.flat());
  const yStep = 1000;
  const yTop = Math.ceil(maxY / yStep) * yStep;
  const x = (k) => pad.left + (k / (n - 1)) * plotW;
  const y = (v) => pad.top + plotH - (v / yTop) * plotH;
  const fmt = (v) => Math.round(v).toLocaleString("en-GB");

  // Gridlines and y-axis labels
  for (let v = 0; v <= yTop; v += yStep) {
    svg.append(
      el("line", { class: "grid", x1: pad.left, x2: width - pad.right, y1: y(v), y2: y(v) }),
      el("text", { class: "tick", x: pad.left - 10, y: y(v) + 4, "text-anchor": "end" }, fmt(v))
    );
  }

  // x-axis labels
  for (let k = 0; k < n; k += 1) {
    svg.append(el("text", { class: "tick", x: x(k), y: height - pad.bottom + 20, "text-anchor": "middle" }, String(k + 1)));
  }
  svg.append(
    el("text", { class: "axis", x: pad.left + plotW / 2, y: height - 8, "text-anchor": "middle" }, "Development year"),
    el(
      "text",
      { class: "axis", x: 14, y: pad.top + plotH / 2, "text-anchor": "middle", transform: `rotate(-90 14 ${pad.top + plotH / 2})` },
      "Cumulative paid (£000)"
    )
  );

  // One curve per accident year: observed solid, projection dashed
  projected.forEach((full, i) => {
    const observedCount = rows[i].length;
    const observed = full.slice(0, observedCount);
    const projection = full.slice(observedCount - 1);
    const toPath = (values, offset) =>
      values.map((v, j) => `${j === 0 ? "M" : "L"}${x(offset + j).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
    const isLatest = i === projected.length - 1;
    const tone = isLatest ? "curve latest" : "curve";

    svg.append(el("path", { class: `${tone} observed`, d: toPath(observed, 0) }));
    if (projection.length > 1) {
      svg.append(el("path", { class: `${tone} projected`, d: toPath(projection, observedCount - 1) }));
    }
    svg.append(el("circle", { class: `dot${isLatest ? " latest" : ""}`, cx: x(observedCount - 1), cy: y(observed[observedCount - 1]), r: 3 }));

    const ultimate = full[n - 1];
    const label = isLatest ? `${firstYear + i} · ult. ${fmt(ultimate)}` : String(firstYear + i);
    svg.append(
      el("text", { class: `label${isLatest ? " latest" : ""}`, x: x(n - 1) + 10, y: y(ultimate) + 4 }, label)
    );
  });
};

renderHeroChart();
