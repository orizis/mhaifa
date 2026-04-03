export async function onRequest(context) {
  const path = context.params.path?.join("/") ?? "";
  const upstream = `https://images.api.mhaifafc.com/${path}`;

  const response = await fetch(upstream);
  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Cache-Control", "public, max-age=604800, immutable");

  return new Response(response.body, {
    status: response.status,
    headers,
  });
}
