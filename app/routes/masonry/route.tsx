import type { LinksFunction } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";

import { MasonryBox, links as box } from "~/components/masonry/masonry.box";

import masonary from "~/styles/components/masonry.css";

import easteregg from "~/images/easteregg.jpg";
import mountaintrial from "~/images/mountaintrail.jpg";
import dolphin from "~/images/dolphin.jpg";
import surfing from "~/images/surfing.jpg";
import aerial from "~/images/aerial.jpg";
import sexy from "~/images/sexy.jpg";
import streetrain from "~/images/streetrain.jpg";
import fujiyama from "~/images/fujiyama.jpg";
import motor from "~/images/motor.jpg";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Remix App | Hands On" }];
};

export let links: LinksFunction = () => {
  return [
    ...box(),
    {
      rel: "stylesheet",
      href: masonary,
    },
  ];
};

export default function Index() {
  return (
    <div className="masonry">
      <MasonryBox image={easteregg} />
      <MasonryBox image={mountaintrial} />
      <MasonryBox image={dolphin} />
      <MasonryBox image={aerial} />
      <MasonryBox image={surfing} />
      <MasonryBox image={sexy} />
      <MasonryBox image={streetrain} />
      <MasonryBox image={fujiyama} />
      <MasonryBox image={motor} />
    </div>
  );
}
