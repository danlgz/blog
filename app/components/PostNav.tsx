import { Link } from "@remix-run/react";

export default function PostNav() {
  return (
    <nav className="w-full sticky z-10 top-0 left-0 right-0 border-b border-dashed border-main/30 px-4 lg:px-0 bg-background dark:bg-background-dark dark:border-main-dark/30">
      <div className="max-w-screen-md mx-auto pb-4 pt-6 flex flex-row items-center justify-between">
        <Link to="..">
          <h3>Daniel Lucas – Blog</h3>
        </Link>
        <div className="flex gap-4">
          <Link to="https://github.com/danlgz/blog" target="_blank" rel="noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              strokeWidth="1.5"
              color="#000"
              viewBox="0 0 24 24"
              className="stroke-main dark:stroke-main-dark"
            >
              <path
                stroke="inherit"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 22.027v-2.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7a5.44 5.44 0 00-1.5-3.75 5.07 5.07 0 00-.09-3.77s-1.18-.35-3.91 1.48a13.38 13.38 0 00-7 0c-2.73-1.83-3.91-1.48-3.91-1.48A5.07 5.07 0 005 5.797a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 00-.94 2.58v2.87M9 20.027c-3 .973-5.5 0-7-3"
              ></path>
            </svg>
          </Link>
          <Link to="https://danlgz.io" target="_blank" rel="noreferrer">
            <span>About</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
