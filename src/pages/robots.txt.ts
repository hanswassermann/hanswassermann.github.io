export function GET(context: { site: URL }) {
    const sitemap = new URL('sitemap.xml', context.site).href;

    const body = `User-agent: *
Allow: /

Sitemap: ${sitemap}
`;

    return new Response(body, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
}
