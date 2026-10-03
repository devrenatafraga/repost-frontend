import Link from "next/link";
import { listPublishedPosts } from "@/api/posts";
import styles from "./page.module.css";

export const revalidate = 60;

function formatDate(value: string | null | undefined): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(date);
}

export default async function Home() {
  const posts = await listPublishedPosts();

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Repost</h1>
      {posts === null ? (
        <p className={styles.lead}>Não foi possível carregar os posts agora.</p>
      ) : posts.length === 0 ? (
        <p className={styles.lead}>Nenhum post publicado ainda.</p>
      ) : (
        <ul className={styles.list}>
          {posts.map((post) => {
            const published = formatDate(post.publishedAt);
            return (
              <li key={post.id}>
                <article>
                  <h2 className={styles.postTitle}>
                    <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                  </h2>
                  {published ? <p className={styles.meta}>{published}</p> : null}
                  {post.excerpt ? <p className={styles.excerpt}>{post.excerpt}</p> : null}
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
