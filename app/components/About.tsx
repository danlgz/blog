import { Link } from "@remix-run/react";

export default function About() {
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h1>Daniel Lucas – Blog</h1>
        <Link to="https://danlgz.io" target="_blank" rel="noreferrer"><span>About</span></Link>
      </div>
      <p className="font-extralight mt-4 text-sm">Software Development / Management / Entrepreneurship</p>
    </>
  )
}
