import { NextRequest, NextResponse } from "next/server";
import puppeteer, { Browser } from "puppeteer";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


interface Event {
  title: string;
  url: string;
  image: string;
  date: string;
  location: string;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function deduplicate(events: Event[]): Event[] {
  const seen = new Set<string>();
  return events.filter((event) => {
    if (seen.has(event.url)) return false;
    seen.add(event.url);
    return true;
  });
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


async function scrapePage(
  browser: Browser,
  country: string,
  city: string,
  pageNum: number
): Promise<Event[]> {
  const page = await browser.newPage();

  // -------------------------------------------------------------------------------

  // Block unwanted resources for speed
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    const type = req.resourceType();
    if (["stylesheet", "font", "image", "media"].includes(type)) {
      req.abort();
    } else {
      req.continue();
    }
  });

  // -------------------------------------------------------------------------------

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
  );

  // -------------------------------------------------------------------------------

  const url = `https://www.eventbrite.com.au/d/${encodeURIComponent(
    country
  )}--${encodeURIComponent(city)}/all-events/?page=${pageNum}`;

  // -------------------------------------------------------------------------------

  try {
    const response = await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    // -------------------------------------------------------------------------------

    if (!response || !response.ok()) {
      await page.close();
      return [];
    }

    // -------------------------------------------------------------------------------

    try {
      await page.waitForSelector("li div.event-card", { timeout: 4000 });
    } catch {
      await page.close();
      return [];
    }

    // -------------------------------------------------------------------------------

    const events: Event[] = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll("li div.event-card"));
      return cards.map((card) => {
        const title =
          card
            .querySelector("h3.event-card__clamp-line--two")
            ?.textContent?.trim() || "";

        let url =
          card.querySelector("a.event-card-link")?.getAttribute("href") || "";
        if (!url.startsWith("http")) {
          url = `https://www.eventbrite.com.au${url}`;
        }

        const image =
          card.querySelector("img.event-card-image")?.getAttribute("src") || "";

        const date =
          card
            .querySelector("section.event-card-details p:nth-of-type(1)")
            ?.textContent?.trim() || "";

        const location =
          card
            .querySelector("section.event-card-details p:nth-of-type(2)")
            ?.textContent?.trim() || "";

        return { title, url, image, date, location };
      });
    });

    // -------------------------------------------------------------------------------

    await page.close();

    // -------------------------------------------------------------------------------

    return events;
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    await page.close();
    return [];
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const country = searchParams.get("country")?.toLowerCase() ?? "australia";
  const city = searchParams.get("city")?.toLowerCase() ?? "sydney";
  const page = parseInt(searchParams.get("page") ?? "1");

  // -------------------------------------------------------------------------------

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  // -------------------------------------------------------------------------------

  try {
    let pagesToScrape: number[] = [];

    // -------------------------------------------------------------------------------

    if (page <= 5) {
      pagesToScrape = [1, 2, 3, 4, 5];
    } else {
      pagesToScrape = [page, page + 1, page + 2, page + 3, page + 4];
    }

    const scrapePromises = pagesToScrape.map((pageNum) =>
      scrapePage(browser, country, city, pageNum)
    );

    // -------------------------------------------------------------------------------

    const results = await Promise.all(scrapePromises);
    const allEvents = results.flat();

    // -------------------------------------------------------------------------------

    await browser.close();

    // -------------------------------------------------------------------------------

    const uniqueEvents = deduplicate(allEvents);

    // -------------------------------------------------------------------------------

    return NextResponse.json({ success: true, events: uniqueEvents });
  } catch (error) {
    await browser.close();
    console.error("❌ Scraping failed:", error);
    return NextResponse.json(
      { success: false, message: "Scraping error", error: String(error) },
      { status: 500 }
    );
  }
}
