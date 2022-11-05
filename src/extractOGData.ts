import chromium from "chrome-aws-lambda";

interface IOGData {
  title: string;
  description?: string;
  image?: string;
  url: string;
  type?: string;
  locale?: string;
}

const extract = async (link: string): Promise<IOGData> => {
  const browser = await chromium.puppeteer.launch();
  const newPage = await browser.newPage();

  await newPage.goto(link);

  const ogTitleText = await newPage.evaluate(() =>
    document.head.querySelector(`meta[property="og:title"]`)?.getAttribute("content")
  );
  const titleTagText = await newPage.evaluate(() => document.head.querySelector("title")?.innerText);
  const title = ogTitleText ?? titleTagText ?? link;

  const ogUrl = await newPage.evaluate(() =>
    document.head.querySelector(`meta[property="og:url"]`)?.getAttribute("content")
  );
  const url = ogUrl ?? link;

  const ogDescriptionText = await newPage.evaluate(() =>
    document.head.querySelector(`meta[property="og:description"]`)?.getAttribute("content")
  );
  const description = ogDescriptionText ?? undefined;

  const ogImageText = await newPage.evaluate(() =>
    document.head.querySelector(`meta[property="og:image"]`)?.getAttribute("content")
  );
  const image = ogImageText ?? undefined;

  const ogTypeText = await newPage.evaluate(() =>
    document.head.querySelector(`meta[property="og:type"]`)?.getAttribute("content")
  );
  const type = ogTypeText ?? undefined;

  const ogLocaleText = await newPage.evaluate(() =>
    document.head.querySelector(`meta[property="og:locale"]`)?.getAttribute("content")
  );
  const locale = ogLocaleText ?? undefined;

  return {
    title,
    url,
    description,
    image,
    type,
    locale,
  };
};

export default extract;
