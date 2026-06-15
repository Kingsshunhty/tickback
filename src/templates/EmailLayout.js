export default function EmailLayout({
  title,
  content,
}) {
  return `
    <!DOCTYPE html>
    <html>
      <body
        style="
          font-family: Arial, sans-serif;
          background:#f5f5f5;
          padding:20px;
          margin:0;
        "
      >
        <div
          style="
            max-width:600px;
            margin:auto;
            background:white;
            border-radius:12px;
            overflow:hidden;
          "
        >
          <div
            style="
              background:#2563eb;
              padding:24px;
              text-align:center;
            "
          >
            <h1
              style="
                color:white;
                margin:0;
              "
            >
              TickOnt
            </h1>
          </div>

          <div style="padding:30px;">
            <h2>${title}</h2>

            ${content}
          </div>

          <div
            style="
              border-top:1px solid #eee;
              padding:20px;
              text-align:center;
              color:#666;
              font-size:12px;
            "
          >
            © TickOnt
          </div>
        </div>
      </body>
    </html>
  `;
}