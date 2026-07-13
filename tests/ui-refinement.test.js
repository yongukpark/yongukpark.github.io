"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

function loadI18n() {
  const sandbox = { window: {} };
  vm.runInNewContext(read("i18n.js"), sandbox);
  return sandbox.window.I18N;
}

function makeButton() {
  const attrs = new Map();
  const listeners = new Map();
  return {
    setAttribute(name, value) { attrs.set(name, String(value)); },
    getAttribute(name) { return attrs.get(name) ?? null; },
    addEventListener(name, callback) { listeners.set(name, callback); },
    click() { listeners.get("click")(); }
  };
}

function bootControls({ theme = "light", lang = "ko" } = {}) {
  const htmlAttrs = new Map([["data-theme", theme], ["lang", lang]]);
  const storage = new Map([["theme", theme], ["lang", lang]]);
  const themeButton = makeButton();
  const langButton = makeButton();
  const i18n = loadI18n();
  const translatable = [];
  const sandbox = {
    console,
    Map,
    window: {
      I18N: i18n,
      matchMedia: () => ({ matches: true })
    },
    localStorage: {
      getItem(key) { return storage.get(key) ?? null; },
      setItem(key, value) { storage.set(key, value); }
    },
    document: {
      readyState: "complete",
      documentElement: {
        classList: { add() {} },
        getAttribute(name) { return htmlAttrs.get(name) ?? null; },
        setAttribute(name, value) { htmlAttrs.set(name, String(value)); }
      },
      getElementById(id) {
        if (id === "theme-toggle") return themeButton;
        if (id === "lang-toggle") return langButton;
        return null;
      },
      querySelectorAll(selector) {
        if (selector === "[data-i18n]" || selector === "[data-i18n-aria]") return translatable;
        return [];
      },
      createElement() { throw new Error("Unexpected element creation"); },
      addEventListener() {}
    }
  };
  vm.runInNewContext(read("script.js"), sandbox);
  return { themeButton, langButton, htmlAttrs, storage };
}

function testControlStates() {
  const controls = bootControls();
  assert.equal(controls.themeButton.getAttribute("aria-pressed"), "false");
  assert.equal(controls.themeButton.getAttribute("aria-label"), "어두운 테마로 전환");

  controls.themeButton.click();
  assert.equal(controls.htmlAttrs.get("data-theme"), "dark");
  assert.equal(controls.themeButton.getAttribute("aria-pressed"), "true");
  assert.equal(controls.themeButton.getAttribute("aria-label"), "밝은 테마로 전환");

  controls.langButton.click();
  assert.equal(controls.htmlAttrs.get("lang"), "en");
  assert.equal(controls.themeButton.getAttribute("aria-label"), "Switch to light theme");
}

function testI18nParityAndLabels() {
  const i18n = loadI18n();
  assert.deepEqual(Object.keys(i18n.ko).sort(), Object.keys(i18n.en).sort());
  assert.equal(i18n.ko["project.link.demo"], "데모");
  assert.equal(i18n.en["project.link.repository"], "Repository");
  assert.equal(i18n.ko["project.links.aria"], "프로젝트 외부 링크");
  assert.equal(i18n.ko["cv.edu.heading"], "학교와 연구실");
  assert.equal(i18n.en["cv.edu.heading"], "Education & labs");
}

function testProjectDataAndRenderingContract() {
  const data = read("_data/projects.yml");
  const page = read("projects.html");
  const card = read("_includes/project-card.html");
  assert.match(data, /links:\s*\[\]/);
  assert.match(page, /site\.data\.projects/);
  assert.match(card, /project\.links/);
  assert.match(card, /rel="noopener noreferrer"/);
  assert.match(card, /data-i18n="project\.link\./);
  assert.match(card, /data-i18n-aria="project\.links\.aria"/);
}

function testEducationAndPresentationHooks() {
  const home = read("index.html");
  const css = read("style.css");
  assert.match(home, /class="home-education/);
  assert.match(home, /data-i18n="cv\.edu\.heading"/);
  assert.match(home, /data-i18n="cv\.edu\.1\.period"/);
  assert.match(css, /\.home-sections/);
  assert.match(css, /\.nav-toggles\s*\{/);
  assert.match(css, /\.project-links/);
}

function testDevelopmentTestsAreNotPublished() {
  assert.ok(read("_config.yml").includes("  - tests"));
}

function testIdeaMapCategoryColors() {
  const css = read("style.css");
  assert.match(css, /\[data-cat="interp"\]\s*\{\s*--dot-color:\s*var\(--cat-interp\);\s*\}/);
}

testControlStates();
testI18nParityAndLabels();
testProjectDataAndRenderingContract();
testEducationAndPresentationHooks();
testDevelopmentTestsAreNotPublished();
testIdeaMapCategoryColors();
console.log("ui-refinement tests passed");
