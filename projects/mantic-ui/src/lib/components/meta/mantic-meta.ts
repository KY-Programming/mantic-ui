/** The key of the route data (or resolve) that holds a route's {@link ManticMeta} */
export const manticMetaKey = 'manticMeta';

/**
 * The meta tags of a page, set per route as `data: { [manticMetaKey]: { description: '...' } }` or, for a page whose
 * texts are only known at runtime, as `resolve: { [manticMetaKey]: route => ... }`. The values of all routes from the root
 * down to the active one are merged, the deepest wins, so a parent can set what holds for its whole section.
 */
export interface ManticMeta {
    /** The page's title for link previews (og:title). Default: the route's title without the strategy's postfix */
    title?: string;
    /** The meta description and og:description. Default: the configuration's description */
    description?: string;
    /** The og:image, absolute or relative to the base href. Default: the configuration's image */
    image?: string;
    /** The og:type. Default: the configuration's type or 'website' */
    type?: string;
    /**
     * The canonical path from the base href, e.g. `/projects/generator`, when the page is a duplicate of another (an alias,
     * a group that shows its default child). Default: the current url without query and fragment
     */
    canonical?: string;
    /** Takes the page out of search engines: robots `noindex`, and no canonical url (a not-found page, a test page) */
    isNoIndex?: boolean;
}
