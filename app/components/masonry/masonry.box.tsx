import type { LinksFunction } from "@remix-run/node";
import masonary from "~/styles/components/masonry.box.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: masonary,
    },
  ];
};

export interface IMasonryBoxProps {
  image: string;
  alt?: string;
  title?: string;
  description?: string;
}

export function MasonryBox(props: IMasonryBoxProps) {
  return (
    <div className="box">
      <img src={props.image} alt={props.alt} />
      <h2>Title Goes Here</h2>
      <p>
        Sint eu ea in magna qui dolore dolor est. Consectetur elit nisi ut ut in
        laborum aliqua do. Nisi eiusmod deserunt tempor non sit exercitation
        aute tempor culpa officia aliqua culpa ullamco veniam.
      </p>
    </div>
  );
}
