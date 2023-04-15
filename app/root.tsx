import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindcss from "~/styles/tailwind.css";

export let links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: tailwindcss,
    },
  ];
};

export default function App() {
  return (
    <html lang="en" data-theme="luxury">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
