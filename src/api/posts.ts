import type { components } from "./schema";

export type PublicPost = components["schemas"]["dev.repost.publicapi.posts.PublicPostResponse"];

const REVALIDATE_SECONDS = 60;

function apiBase(): string {
  return (process.env.API_BASE_URL ?? "http://localhost:8080").replace(/\/$/, "");
}

async function publicGet(path: string): Promise<Response | null> {
  try {
    return await fetch(`${apiBase()}${path}`, { next: { revalidate: REVALIDATE_SECONDS } });
  } catch {
    return null;
  }
}

export async function listPublishedPosts(): Promise<PublicPost[] | null> {
  const response = await publicGet("/api/v1/public/posts");
  if (!response || !response.ok) return null;
  const body = (await response.json()) as components["schemas"]["dev.repost.publicapi.posts.PublicPostListResponse"];
  return body.items;
}

export async function getPublishedPost(slug: string): Promise<PublicPost | null | undefined> {
  const response = await publicGet(`/api/v1/public/posts/${encodeURIComponent(slug)}`);
  if (!response) return undefined;
  if (response.status === 404) return null;
  if (!response.ok) return undefined;
  return (await response.json()) as PublicPost;
}
