import { Fragment } from 'react';
import { Outlet } from '@remix-run/react';
import type { LinksFunction } from "@remix-run/node";

import SimpleNav, { links as nav } from '~/components/navigation/simple.nav';

export let links: LinksFunction = () => {
  return [
    ...nav(),
  ];
};

export default function Auth() {
  return (
    <Fragment>
      <SimpleNav />
      <Outlet />
    </Fragment>
  );
}
