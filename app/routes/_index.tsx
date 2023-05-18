import { Fragment } from 'react';
import type { LinksFunction } from '@remix-run/node';
import type { V2_MetaFunction } from "@remix-run/react";
import SimpleNav, { links as nav } from '~/components/navigation/simple.nav';

export const meta: V2_MetaFunction = () => {
  return [{ title: "Remix App | Hands On" }];
};

export let links: LinksFunction = () => {
  return [
    ...nav(),
  ];
};

export default function Index() {
  return (
    <Fragment>
      <SimpleNav />
    </Fragment>
  );
}
