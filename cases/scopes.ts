// Does the SCOPE of the narrowed binding change the answer, and did TypeScript
// 5.4's "Preserved Narrowing in Closures" actually move any of these?
//
// Line numbers are the case identity. Keep them stable — scripts/run-matrix.mjs
// maps them to labels in CASES below the fixtures.
declare function sink(x: unknown): void;

// TypeScript 5.4's own documented example, in shape. The control: if this does
// not flip between 5.3 and 5.4, the harness is measuring the wrong thing.
function ts54Example(url: string | URL) {
  if (typeof url === 'string') { url = new URL(url); }
  return () => sink(url.href);                // 12 · the 5.4 feature's own case
}

// A `let` declared inside a function body.
function functionScopedLet() {
  let x = document.getElementById('x');
  if (x) {
    function x_decl() { sink(x.id); }         // 19 · fn-scope let · declaration
    const x_arrow = () => { sink(x.id); };    // 20 · fn-scope let · arrow
    sink([x_decl, x_arrow]);
  }
}

// A `const` at module scope, arrow only — the baseline that has always worked.
const m = document.getElementById('m');
if (m) {
  const m_arrow = () => { sink(m.id); };      // 28 · module const · arrow
  sink(m_arrow);
}

sink([ts54Example, functionScopedLet]);
