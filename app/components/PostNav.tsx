import { Link } from "@remix-run/react";
import Github from "./icons/Github";

export default function PostNav() {
  return (
    <nav className="w-full sticky z-10 top-0 left-0 right-0 border-b border-dashed border-main/30 px-4 lg:px-0 bg-background dark:bg-background-dark dark:border-main-dark/30">
      <div className="max-w-screen-md mx-auto pb-4 pt-6 flex flex-row items-center justify-between">
        <Link to="..">
          <h3>Daniel Lucas – Blog</h3>
        </Link>
        <div className="flex gap-4">
          <Link to="https://github.com/danlgz/blog" target="_blank" rel="noreferrer">
            <Github />
          </Link>
          <Link to="https://danlgz.io" target="_blank" rel="noreferrer">
            <span>About</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
