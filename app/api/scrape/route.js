import { NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

export async function POST(req) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: "URL is required" }, { status: 400 });

    const match = url.match(/https?:\/\/[^\s]+/);
    const cleanUrl = match ? match[0] : url;

    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto(cleanUrl, { waitUntil: "networkidle2", timeout: 30000 });

    const data = await page.evaluate(() => {
      const ogImage = document.querySelector('meta[property="og:image"]')?.content;
      const ogTitle = document.querySelector('meta[property="og:title"]')?.content;
      const img = document.querySelector('img[src*="images.meesho.com"]')?.src;
      return {
        image: ogImage || img || "",
        title: ogTitle || document.title || "",
      };
    });

    await browser.close();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
