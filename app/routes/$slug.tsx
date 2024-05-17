import { Link, Outlet, json, useLoaderData } from "@remix-run/react";
import matter from "gray-matter";
import PostListItem from "~/components/PostListItem";
import PostNav from "~/components/PostNav";
import { getDirsFromPublic, getFileFromPublic } from "~/utils/fs.server";

export const loader = async () => {
  const dirs = (await getDirsFromPublic()).filter(d => d.isDirectory()).map(d => d.name);

  const numberOfRandomElements = Math.min(3, dirs.length);
  const indices = new Set();
  while (indices.size < numberOfRandomElements) {
    indices.add(Math.floor(Math.random() * dirs.length));
  }

  const filteredDirs = Array.from(indices).map(i => dirs[i]);
  const fileContents = await Promise.all(
    filteredDirs.map((dir) => getFileFromPublic(`${dir}/index.md`)),
  );
  const posts = filteredDirs.map((slug, i) => {
    const fileContent = fileContents[i];
    const { data } = matter(fileContent);
    return { slug, ...data } as { slug: string; title: string; date: string; description: string };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return json({ posts });
}

export default function SlugIndexRoute() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <>
      <PostNav />
      <main className="w-full max-w-screen-md mx-auto pt-4 pb-12 px-4 lg:px-0">
        <Outlet />
      </main>
      <footer className="bg-main dark:bg-black/30">
        <div className="w-full max-w-screen-md mx-auto py-16 px-4 lg:px-0">
          <h1 className="text-background">Otros posts</h1>
          <div className="mt-12 flex flex-col gap-8 force-text-dark">
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
        </div>
      </footer>
    </>
  )
}
