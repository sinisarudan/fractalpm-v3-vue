/**
 * types taken out from `node_modules/vuetify/lib/components/index.d.ts` bc. `Module '"vuetify/components"' declares 'SelectItem' locally, but it is not exported`
 */

export declare type RouteLocationRaw = string
// export declare type RouteLocationRaw = string | (RouteQueryAndHash & LocationAsPath & RouteLocationOptions) | (RouteQueryAndHash & LocationAsRelativeRaw & RouteLocationOptions);

interface LinkProps {
  href?: string
  replace?: boolean
  to?: RouteLocationRaw
}

export type SelectItem = string | (string | number)[]
//original:
// export  type SelectItem = string | (string | number)[] | ((item: Record<string, any>, fallback?: any) => any) | (LinkProps & {
//     text: string;
// });
