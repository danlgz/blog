import { Link } from "@remix-run/react";

export default function Footer() {
  return (
    <p className="text-center p-4 mt-32">
      Made with 🫶 by
      <Link to="https://danlgz.io" target="_blank" rel="noreferrer" className="ml-2">
        <span>danlgz.io</span>
      </Link>
    </p>
  )
}
