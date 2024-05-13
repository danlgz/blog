import { Outlet } from "@remix-run/react";
import PostNav from "~/components/PostNav";

export default function SlugIndexRoute() {
  return (
    <>
      <PostNav />
      <main className="w-full max-w-screen-md mx-auto pt-8 px-4 lg:px-0">
        <Outlet />
      </main>
    </>
  )
}
