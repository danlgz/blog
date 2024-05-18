import { compile } from "@mdx-js/mdx";
import rehypeHighlight from 'rehype-highlight';
import {visit} from 'unist-util-visit'
import remarkGfm from 'remark-gfm'
// Note: `@remark-embedder` is currently using faux-esm.
// eslint-disable-next-line
import fauxRemarkEmbedder from '@remark-embedder/core'
import fauxOembedTransformer from '@remark-embedder/transformer-oembed'

// @ts-expect-error: `remarkEmbedder` types are wrong.
const remarkEmbedder = fauxRemarkEmbedder.default;
// @ts-expect-error: `remarkEmbedder` types are wrong.
const oembedTransformer = fauxOembedTransformer.default;

export default async function renderMD(content: string) {

  const html = await compile(
    content,
    {
      outputFormat: 'function-body',
      rehypePlugins: [
        () => (tree) => {
          visit(tree, (node) => {
            if (node?.type === "element" && node?.tagName === "pre") {
              const [codeEl] = node.children;

              if (codeEl.tagName !== "code") return;

              node.raw = codeEl.children?.[0].value;
              node.properties = {
                raw: node.raw,
              };
            }
          });
        },
        rehypeHighlight,
      ],
      remarkPlugins: [
        remarkGfm,
        [
          remarkEmbedder,
          {transformers: [oembedTransformer]},
        ]
      ],
    }
  )

  return String(html);
}
