/**
 * Prefix a root-relative path with the site's configured base path
 * (`import.meta.env.BASE_URL`, e.g. `/qti3-doc/` on GitLab Pages).
 *
 * Starlight rewrites root-relative links written in Markdown/MDX prose
 * automatically, but links passed as props to components (e.g. Related, Card,
 * LinkCard) are rendered verbatim — use this helper for those so they keep
 * working when the site is served under a subpath.
 */
export function withBase(path: string): string {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	return path.startsWith('/') ? base + path : path;
}
