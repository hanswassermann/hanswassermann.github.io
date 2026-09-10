import { socials } from "../data/socials";

interface SchemaProps {
    title: string;
    description: string;
    site: string;
    pathname: string;
}

export function getSchema({ title, description, site, pathname }: SchemaProps) {
    const base = site.replace(/\/$/, '');
    const url = new URL(pathname, base).href;

    const isHome = pathname === "/";
    const isProject = pathname.startsWith("/projects/");

    const personId = `${base}/#person`;
    const websiteId = `${base}/#website`;

    const webPage = {
        "@type": "WebPage",
        "@id": url,
        "url": url,
        "name": title,
        "description": description,
        "isPartOf": { "@id": websiteId },
        "author": { "@id": personId },
        ...(isProject ? { "mainEntity": { "@id": `${url}#project` } } : {})
    };

    const project = {
        "@type": "CreativeWork",
        "@id": `${url}#project`,
        "name": title,
        "description": description,
        "url": url,
        "author": { "@id": personId }
    };

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person",
                "@id": personId,
                "name": "Hans Wassermann",
                "url": base,
                "sameAs": socials.map(({ href }) => href)
            },
            {
                "@type": "WebSite",
                "@id": websiteId,
                "url": base,
                "name": "Hans Wassermann",
                "alternateName": "Hans Wassermann",
                "inLanguage": "en-US",
                "publisher": { "@id": personId }
            },
            ...(!isHome ? [ webPage ] : []),
            ...(isProject ? [ project ] : [])
        ]
    };
}