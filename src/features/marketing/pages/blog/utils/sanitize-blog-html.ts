import sanitizeHtml from "sanitize-html";

/**
 * Blog body-r sanitization policy.
 *
 * Backend `body` field-e admin-er editor theke asha **rich HTML** thake, ar oita
 * `dangerouslySetInnerHTML` diye boshate hoy. Admin trusted holeo kacha HTML
 * boshano jay na — admin account compromise hole ba editor kono din script
 * dhukte dile sheta protita visitor-er browser-e cholto (stored XSS).
 *
 * Tai ekta **allowlist** — ja ache shudhu sheta thake, baki shob bad.
 *
 * Ei function **server-e** chole (blog detail page ekta server component), tai
 * unsanitized HTML kokhono browser porjonto pouchay na.
 */
export function sanitizeBlogHtml(html: string): string {
  if (!html) return "";

  return sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "hr",
      "h2", "h3", "h4",
      "strong", "b", "em", "i", "u", "s",
      "ul", "ol", "li",
      "blockquote",
      "a",
      "img",
      "figure", "figcaption",
      "code", "pre",
      "table", "thead", "tbody", "tr", "th", "td",
    ],
    allowedAttributes: {
      a: ["href", "title"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      // `class` ichchhe kore bad — editor-er class amader design token-er
      // shathe milbe na, ar attribute injection-er jayga kombe
    },
    // `javascript:` / `data:` href atkate — shudhu ei protocol gula chole
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: { img: ["http", "https"] },
    transformTags: {
      // Bahirer link notun tab-e, ar `rel` chhara `target="_blank"` khullei
      // reverse-tabnabbing er jayga toiri hoy
      a: sanitizeHtml.simpleTransform("a", {
        target: "_blank",
        rel: "noopener noreferrer",
      }),
    },
    // Bad deওয়া tag-er bhitorer text-o jate na thake (jemon <script>alert()</script>)
    nonTextTags: ["style", "script", "textarea", "option", "noscript"],
  });
}
