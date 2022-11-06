import * as cheerio from "cheerio";
import nfetch from "node-fetch";
interface IOGData {
  success: boolean;
  title: string;
  description?: string;
  image?: string;
  url: string;
  type?: string;
  locale?: string;
}

const extract = async (link: string): Promise<IOGData> => {
  const html = await (await nfetch(link)).text();
  const $ = cheerio.load(html);

  const ogTitleText = $(`meta[property="og:title"]`)?.attr("content");
  const titleTagText = $("title")?.text();
  const title = ogTitleText ?? titleTagText ?? link;

  const ogUrl = $(`meta[property="og:url"]`)?.attr("content");
  const url = ogUrl ?? link;

  const ogDescriptionText = $(`meta[property="og:description"]`)?.attr("content");
  const description = ogDescriptionText ?? undefined;

  const ogImageText = $(`meta[property="og:image"]`)?.attr("content");
  const image = ogImageText ?? undefined;

  const ogTypeText = $(`meta[property="og:type"]`)?.attr("content");
  const type = ogTypeText ?? undefined;

  const ogLocaleText = $(`meta[property="og:locale"]`)?.attr("content");
  const locale = ogLocaleText ?? undefined;

  console.log(JSON.stringify({ description }));

  return {
    success: true,
    title,
    url,
    description,
    image,
    type,
    locale,
  };
};

export default extract;
