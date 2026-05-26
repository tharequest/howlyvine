import type { Project } from "./types";

export interface SiteData {
  projects: Project[];
}

const GIST_API = "https://api.github.com/gists";
export const DATA_FILENAME = "howlyvine-data.json";

export async function fetchFromGist(gistId: string): Promise<SiteData | null> {
  try {
    const res = await fetch(`${GIST_API}/${gistId}`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;
    const gist = await res.json();
    const file = gist.files?.[DATA_FILENAME];
    if (!file?.content) return null;
    return JSON.parse(file.content) as SiteData;
  } catch {
    return null;
  }
}

export async function saveToGist(
  gistId: string,
  token: string,
  data: SiteData
): Promise<boolean> {
  try {
    const res = await fetch(`${GIST_API}/${gistId}`, {
      method: "PATCH",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify({
        files: {
          [DATA_FILENAME]: { content: JSON.stringify(data, null, 2) },
        },
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
