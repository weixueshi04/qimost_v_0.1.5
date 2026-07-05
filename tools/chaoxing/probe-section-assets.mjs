import { chromium } from "playwright-core";
import { saveJson, saveMarkdown } from "./browser-utils.mjs";

const port = Number(process.env.CHAOXING_DEBUG_PORT ?? 9222);

function normalize(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function shorten(value, length = 180) {
  const text = normalize(value);
  return text.length > length ? `${text.slice(0, length)}...` : text;
}

async function pickCurrentStudyPage(context) {
  const pages = context.pages();
  const studyPage = pages.find((page) => /studentstudy|knowledge\/cards|chaoxing/i.test(page.url()));
  return studyPage ?? pages.at(-1);
}

async function inspectFrame(frame) {
  const frameInfo = {
    url: frame.url(),
    title: await frame.title().catch(() => ""),
    textPreview: "",
    links: [],
    buttons: [],
    inputs: [],
    media: [],
    embeds: [],
    images: [],
    iframes: []
  };

  frameInfo.textPreview = shorten(await frame.locator("body").innerText({ timeout: 3000 }).catch(() => ""), 2000);

  frameInfo.links = await frame
    .locator("a")
    .evaluateAll((nodes) =>
      nodes.slice(0, 200).map((node) => ({
        text: (node.innerText || node.textContent || "").replace(/\s+/g, " ").trim(),
        title: node.getAttribute("title") || "",
        href: node.href || node.getAttribute("href") || "",
        download: node.getAttribute("download") || "",
        className: node.className || ""
      }))
    )
    .catch(() => []);

  frameInfo.buttons = await frame
    .locator("button, [role=button], .download, [title*=下载], [aria-label*=下载]")
    .evaluateAll((nodes) =>
      nodes.slice(0, 200).map((node) => ({
        tag: node.tagName,
        text: (node.innerText || node.textContent || "").replace(/\s+/g, " ").trim(),
        title: node.getAttribute("title") || "",
        aria: node.getAttribute("aria-label") || "",
        className: node.className || "",
        id: node.id || ""
      }))
    )
    .catch(() => []);

  frameInfo.inputs = await frame
    .locator("input")
    .evaluateAll((nodes) =>
      nodes.slice(0, 100).map((node) => ({
        type: node.getAttribute("type") || "",
        name: node.getAttribute("name") || "",
        value: node.getAttribute("value") || "",
        id: node.id || "",
        className: node.className || ""
      }))
    )
    .catch(() => []);

  frameInfo.media = await frame
    .locator("video, audio, source")
    .evaluateAll((nodes) =>
      nodes.slice(0, 100).map((node) => ({
        tag: node.tagName,
        src: node.src || node.getAttribute("src") || "",
        type: node.getAttribute("type") || ""
      }))
    )
    .catch(() => []);

  frameInfo.embeds = await frame
    .locator("object, embed")
    .evaluateAll((nodes) =>
      nodes.slice(0, 100).map((node) => ({
        tag: node.tagName,
        data: node.getAttribute("data") || "",
        src: node.getAttribute("src") || "",
        type: node.getAttribute("type") || ""
      }))
    )
    .catch(() => []);

  frameInfo.images = await frame
    .locator("img")
    .evaluateAll((nodes) =>
      nodes.slice(0, 200).map((node) => ({
        alt: node.getAttribute("alt") || "",
        title: node.getAttribute("title") || "",
        src: node.currentSrc || node.src || node.getAttribute("src") || "",
        className: node.className || ""
      }))
    )
    .catch(() => []);

  frameInfo.iframes = await frame
    .locator("iframe")
    .evaluateAll((nodes) =>
      nodes.slice(0, 100).map((node) => ({
        title: node.getAttribute("title") || "",
        name: node.getAttribute("name") || "",
        src: node.src || node.getAttribute("src") || "",
        id: node.id || "",
        className: node.className || ""
      }))
    )
    .catch(() => []);

  return frameInfo;
}

async function main() {
  const browser = await chromium.connectOverCDP(`http://127.0.0.1:${port}`);
  const context = browser.contexts()[0];
  if (!context) throw new Error("No browser context is available. Open a Chaoxing section first.");

  const page = await pickCurrentStudyPage(context);
  if (!page) throw new Error("No page is available in the automated browser.");

  await page.waitForTimeout(2000);

  const frames = [];
  for (const frame of page.frames()) {
    frames.push(await inspectFrame(frame));
  }

  const result = {
    checkedAt: new Date().toISOString(),
    pageUrl: page.url(),
    frameCount: frames.length,
    frames
  };

  const jsonPath = await saveJson("section-assets-probe.json", result);

  const rows = [];
  for (const [frameIndex, frame] of frames.entries()) {
    for (const link of frame.links) {
      rows.push(`| ${frameIndex} | link | ${shorten(link.text || link.title, 60).replace(/\|/g, "\\|")} | ${link.href} |`);
    }
    for (const button of frame.buttons) {
      rows.push(`| ${frameIndex} | button | ${shorten(button.text || button.title || button.aria || button.className, 60).replace(/\|/g, "\\|")} | ${button.id || button.className || ""} |`);
    }
    for (const embed of frame.embeds) {
      rows.push(`| ${frameIndex} | embed | ${embed.type || embed.tag} | ${embed.data || embed.src} |`);
    }
    for (const media of frame.media) {
      rows.push(`| ${frameIndex} | media | ${media.type || media.tag} | ${media.src} |`);
    }
    for (const image of frame.images) {
      const src = image.src || "";
      if (/pdf|pan|chaoxing|download|file|object|ananas/i.test(src)) {
        rows.push(`| ${frameIndex} | image | ${shorten(image.alt || image.title || image.className, 60).replace(/\|/g, "\\|")} | ${src} |`);
      }
    }
    for (const iframe of frame.iframes) {
      rows.push(`| ${frameIndex} | iframe | ${shorten(iframe.title || iframe.name || iframe.id || iframe.className, 60).replace(/\|/g, "\\|")} | ${iframe.src} |`);
    }
  }

  const mdPath = await saveMarkdown(
    "section-assets-probe.md",
    [
      "# Chaoxing Section Asset Probe",
      "",
      `- Checked at: ${result.checkedAt}`,
      `- Page: ${result.pageUrl}`,
      `- Frames: ${result.frameCount}`,
      "",
      "| Frame | Type | Label | URL / Data |",
      "|---|---|---|---|",
      ...rows
    ].join("\n")
  );

  console.log(`Probe JSON saved: ${jsonPath}`);
  console.log(`Probe Markdown saved: ${mdPath}`);
}

await main();
