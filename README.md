# A Simple API to extract Open Graph Meta tags from a URL

## Endpoint

You can send a HTTTP GET Request to `https://ogextractor.netlify.app/extract?url=<URL>` where URL is the url for which you want the Open Graph Data.

## Response

```
{
  "success":true,
  "title":"Sample Title",
  "description": "Sample Description",
  "url": "Sample URL",
  "locale": "Sample Locale",
  "image":"https://random.image.png",
  "type":"Sample Type"
}
```

## Response Feilds

- `success` - Denotes if Open Graph data was extracted Successfully or not. `true` or `false`.
- `title` - The `og:title` data or the `<title>` tag data or the `url` or `undefined`.
- `description` - The `og:description` data or `udefined`.
- `url` - The `og:url` data or the `url` or `udefined`.
- `locale` - The `og:locale` data or `undefined`.
- `image` - The `og:image` data or `undefined`.
- `type` - The `og:type` data or `undefined`.
