import type { LinksFunction } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";

import text from "~/styles/routes/text.css";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export let links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: text,
    },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <button className="btn">Hello daisyUI</button>

      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            className="danger"
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
