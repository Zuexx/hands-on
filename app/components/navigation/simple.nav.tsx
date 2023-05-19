import { Fragment } from 'react';
import { Link, useFetcher } from '@remix-run/react';
import type { LinksFunction } from "@remix-run/node";

import style from "~/styles/components/simple.nav.css";

export let links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: style,
    },
  ];
};

export default function SimpleNav() {
  const fetcher = useFetcher();

  const handleSignOut = (event: any) => {
    fetcher.submit(null, { method: "post", action: "/logout" })
  }

  return (
    <Fragment>
      <div className='container'>
        <Link to="/" className="link">Home</Link>
        <Link to="/login" className="link">Login</Link>
        <Link to="/register" className="link">Register</Link>
        <Link to="/forget" className="link">Forget Password</Link>
        <button className="link" onClick={handleSignOut}>Logout</button>
      </div>
    </Fragment>
  );
}
