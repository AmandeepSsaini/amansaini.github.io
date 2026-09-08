/* Where this site is published.
 *
 * The GitHub account is `AmandeepSsaini`, so the repo `amansaini.github.io`
 * does NOT match the username and is served as a PROJECT page under a
 * sub-path, not at a domain root.
 *
 * To move to a root URL later, rename the repo to `amandeepssaini.github.io`
 * (or attach a custom domain) and set NEXT_PUBLIC_BASE_PATH="" — nothing else
 * needs to change.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const ORIGIN = process.env.NEXT_PUBLIC_ORIGIN ?? "https://amandeepssaini.github.io";
export const SITE_URL = `${ORIGIN}${BASE_PATH}`;

/** Prefix a public/ asset with the base path so it resolves on a project page. */
export const asset = (path: string) => `${BASE_PATH}${path}`;
