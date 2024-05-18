import { useState } from "react";
import Copy from "./icons/Copy";
import Check from "./icons/Check";

type Props = {
  text: string;
}

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
      {isCopied ? <Check /> : <Copy />}
    </button>
  );
}
