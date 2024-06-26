import { runSync } from "@mdx-js/mdx";
import * as runtime from 'react/jsx-runtime';
import * as embeds from 'mdx-embed';
import { ImgClientOnly } from "./Img";
import Pre from "./Pre";

type Props = {
  code: string;
};

export default function MDX({ code }: Props) {
  const { default: Content } = runSync(code, {
    baseUrl: import.meta.url,
    Fragment: runtime.Fragment,
    // @ts-expect-error: JSX runtime is not typed
    jsx: runtime.jsx,
    // @ts-expect-error: JSX runtime is not typed
    jsxs: runtime.jsxs,
  });

  return <Content components={{
    ...embeds,
    Img: ImgClientOnly,
    // @ts-expect-error: JSX runtime is not typed
    pre: Pre,
  }} />;
}
