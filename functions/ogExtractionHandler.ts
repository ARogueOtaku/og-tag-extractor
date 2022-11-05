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
      statusCode: 200,
      body: JSON.stringify(extractedData),
    };
  } catch (e: any) {
    return {
      statusCode: 500,
      body: e.message,
    };
  }
};

export { handler };
