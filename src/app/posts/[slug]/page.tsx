import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedPost, listPublishedPosts } from "@/api/posts";
import { Markdown } from "@/components/Markdown";
import styles from "../../page.module.css";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await listPublishedPosts();
  return (posts ?? []).map((post) => ({ slug: post.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(value: string | null | undefined): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(date);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return { title: "Post" };
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (post === null) notFound();
  const published = post ? formatDate(post.publishedAt) : null;

  return (
    <main className={styles.page}>
      <p className={styles.back}>
        <Link href="/">← Posts</Link>
      </p>
      {post === undefined ? (
        <p className={styles.lead}>Não foi possível carregar este post agora.</p>
      ) : (
        <article>
          <h1 className={styles.title}>{post.title}</h1>
          {published ? <p className={styles.meta}>{published}</p> : null}
          <Markdown source={post.contentMd} />
        </article>
      )}
    </main>
  );
}
