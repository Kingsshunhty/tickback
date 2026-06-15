export default function Button(
  text,
  href,
) {
  return `
    <a
      href="${href}"
      style="
        display:inline-block;
        padding:12px 20px;
        background:#2563eb;
        color:white;
        text-decoration:none;
        border-radius:8px;
      "
    >
      ${text}
    </a>
  `;
}