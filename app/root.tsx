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
import button from "~/styles/components/button.css";

export let links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: tailwindcss,
    },
    {
      rel: "stylesheet",
      href: button,
    },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <span className="btn">Test</span>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
