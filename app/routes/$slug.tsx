import { Link, Outlet } from "@remix-run/react";



export default function SlugIndexRoute() {
  return (
    <>
      <nav className="w-full max-w-screen-md mx-auto my-4 py-4 flex flex-row items-center justify-between border-b border-main/30 dark:border-main-dark/30">
        <Link to="..">
          <h3>Daniel Lucas – Blog</h3>
        </Link>
        <Link to="https://danlgz.io" target="_blank" rel="noreferrer">
          <span>About</span>
        </Link>
      </nav>

      <main className="w-full max-w-screen-md mx-auto pt-8 px-4 lg:px-0">
        <Outlet />
      </main>
    </>
  )
}
