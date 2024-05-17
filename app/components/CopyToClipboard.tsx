import { useState } from "react";

type Props = {
  text: string;
}

const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    className="stroke-main dark:stroke-main-dark"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.4 20H9.6a.6.6 0 01-.6-.6V9.6a.6.6 0 01.6-.6h9.8a.6.6 0 01.6.6v9.8a.6.6 0 01-.6.6z"
    ></path>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 9V4.6a.6.6 0 00-.6-.6H4.6a.6.6 0 00-.6.6v9.8a.6.6 0 00.6.6H9"
    ></path>
  </svg>
)

const CopySucessIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    className="stroke-main dark:stroke-main-dark"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 13l4 4L19 7"
    ></path>
  </svg>
)

export default function CopyToClipboard ({ text }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <button
      disabled={isCopied}
      onClick={copy}
      className="absolute top-2 right-2 py-1 px-2 text-main dark:text-background">
      {isCopied ? <CopySucessIcon /> : <CopyIcon />}
    </button>
  );
}
