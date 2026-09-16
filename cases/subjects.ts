// Every case below narrows identically and differs ONLY in how the consuming
// function is declared. Line numbers are the identity — keep them stable.
declare function sink(x: unknown): void;

const c = document.getElementById('c'); // HTMLElement | null
if (c) {
  function c_decl() { sink(c.id); }           // 7  const · function declaration
  const c_arrow = () => { sink(c.id); };      // 8  const · arrow
  const c_expr = function () { sink(c.id); }; // 9  const · function expression
  var c_var = function () { sink(c.id); };    // 10 const · var-assigned expression
  [1].forEach(() => { sink(c.id); });         // 11 const · inline callback
  (() => { sink(c.id); })();                  // 12 const · IIFE
  sink([c_decl, c_arrow, c_expr, c_var]);
}

let l = document.getElementById('l'); // HTMLElement | null
if (l) {
  function l_decl() { sink(l.id); }           // 18 let · function declaration
  const l_arrow = () => { sink(l.id); };      // 19 let · arrow
  const l_expr = function () { sink(l.id); }; // 20 let · function expression
  [1].forEach(() => { sink(l.id); });         // 21 let · inline callback
  sink([l_decl, l_arrow, l_expr]);
}

function withParam(p: HTMLElement | null) {
  if (p) {
    function p_decl() { sink(p.id); }         // 27 param · function declaration
    const p_arrow = () => { sink(p.id); };    // 28 param · arrow
    sink([p_decl, p_arrow]);
  }
}
sink(withParam);
