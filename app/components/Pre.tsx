import { HTMLAttributes } from "react";
import { ClientOnly } from "remix-utils/client-only";
import CopyToClipboard from "./CopyToClipboard";

type Props = HTMLAttributes<HTMLPreElement> & {
  raw: string;
};


export default function Pre ({ children, raw, ...props }: Props) {

  return (
    <pre {...props} className="relative">
      {children}
      <ClientOnly>
        {
          () => <CopyToClipboard text={raw} />
        }
      </ClientOnly>
    </pre>
  );
}
