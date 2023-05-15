import { Fragment } from 'react';
import { json, LinksFunction, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { LoaderArgs } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";
import { getUser } from "~/utils/session.server";

// import portfolio from "~/styles/routes/portfolio.css";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Remix App | Hands On" }];
};

// export let links: LinksFunction = () => {
//   return [
//     {　
//       rel: "stylesheet",
//       href: portfolio,
//     },
//   ];
// };

// export let loader = async ({ request }: LoaderArgs) => {
//   const user = await getUser(request);
//   if (user === null)
//     return redirect("/login")

//   return user
// }


export default function Index() {
  // const data = useLoaderData<typeof loader>();

  return (
    <Fragment>
      <h1>Index Page</h1>
    </Fragment>
  );
}
