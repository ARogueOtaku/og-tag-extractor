import { Handler, HandlerEvent } from "@netlify/functions";
import extract from "../src/extractOGData";

const handler: Handler = async (event: HandlerEvent) => {
  try {
    let url = event.queryStringParameters?.url;
    if (typeof url === "undefined") throw new Error("Please Mention an URL");
    const protocol = /(?<protocol>[a-z]+):\/\/.+/g.exec(url)?.groups?.protocol;
    if (!protocol) url = "https://" + url;
    const extractedData = await extract(url);
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "text/plain; charset=utf-8",
      },
      statusCode: 200,
      body: JSON.stringify(extractedData),
    };
  } catch (e: any) {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "text/plain; charset=utf-8",
      },
      statusCode: 500,
      body: JSON.stringify({ success: false, title: e.message, url: "" }),
    };
  }
};

export { handler };
