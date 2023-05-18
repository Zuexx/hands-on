import { Fragment } from 'react';
import { json, redirect } from '@remix-run/node';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { getUserId, logout } from '~/utils/session.server';

export let loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (!userId) return redirect("/login");
  return json({});
}

export const action = async ({ request }: ActionArgs) => {
  return await logout(request);
}

export default function Logout() {
  return (
    <Fragment>
    </Fragment>
  );
}
