import type { MetaFunction } from "@remix-run/node";
import { Link, json, useLoaderData } from "@remix-run/react";
import matter from "gray-matter";
import Footer from "~/components/Footer";
import PostListItem from "~/components/PostListItem";
import About from "~/components/About";
import { getDirs, getFile } from "~/utils/fs.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Daniel Lucas – Blog" },
    { name: "description", content: "Some description about the blog" },
  ];
};

export const loader = async () => {
  const dirs = (await getDirs("../posts")).filter(d => d.isDirectory()).map(d => d.name);
  const fileContents = await Promise.all(
    dirs.map((dir) => getFile(`../posts/${dir}/index.md`)),
  );
  const posts = dirs.map((slug, i) => {
    const fileContent = fileContents[i];
    const { data } = matter(fileContent);
    return { slug, ...data } as { slug: string; title: string; date: string; description: string };
  });

  return json({ posts });
}

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <main className="w-full max-w-screen-md mx-auto pt-16 px-4 lg:px-0">
      <About />

      <div className="mt-16 flex flex-col gap-8">
        {
          posts.map(post => (
            <Link to={`/${post.slug}`} key={post.slug} className="hover:no-underline">
              <PostListItem
                title={post.title}
                date={new Date(post.date)}
                spoiler={post.description}
              />
            </Link>
          ))
        }
      </div>

      <Footer />
    </main>
  );
}
