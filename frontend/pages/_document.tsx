import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const themeScript = `
    (function() {
      try {
        var storedTheme = localStorage.getItem("light-theme");
        var theme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : "dark";
        document.documentElement.dataset.theme = theme;
      } catch (error) {
        document.documentElement.dataset.theme = "dark";
      }
    })();
  `;

  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
