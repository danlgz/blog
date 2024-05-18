import { Link } from "@remix-run/react";
import Github from "./icons/Github";

export default function About() {
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h1>Daniel Lucas – Blog</h1>
        <div className="flex gap-4">
          <Link to="https://github.com/danlgz/blog" target="_blank" rel="noreferrer">
            <Github />
          </Link>
          <Link to="https://danlgz.io" target="_blank" rel="noreferrer"><span>About</span></Link>
        </div>
      </div>
      <p className="font-extralight mt-4 text-sm">Software Development / Management / Entrepreneurship</p>
    </>
  )
}
