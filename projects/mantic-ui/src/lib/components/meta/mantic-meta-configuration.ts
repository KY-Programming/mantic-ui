/** The site-wide defaults of the meta tags, set with `provideManticMeta(...)` */
export interface ManticMetaConfiguration {
    /** The og:site_name and the og:title of pages without a title, e.g. 'KY-Programming' */
    siteName?: string;
    /** The description of pages without one of their own */
    description?: string;
    /** The og:image of pages without one of their own, absolute or relative to the base href (1200x630 for a large card) */
    image?: string;
    /** The og:type of pages without one of their own. Default: 'website' */
    type?: string;
    /** The og:locale, e.g. 'de_DE' */
    locale?: string;
    /** The og:locale:alternate entries: the other languages the site is available in, e.g. ['en_US'] */
    alternateLocales?: string[];
    /**
     * The twitter:card of pages without one of their own. Default: 'summary_large_image' when there is an image, else
     * 'summary'. Set 'summary' for a square image (a logo): the large card would crop it to 2:1
     */
    twitterCard?: 'summary' | 'summary_large_image';
    /**
     * Maps a page's canonical path (from the base href, without query and fragment) to the one search engines are to index,
     * e.g. to send the copies of a page in another section to the original. Undefined leaves the page without a canonical url
     */
    canonical?: (path: string) => string | undefined;
}
