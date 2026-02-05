import { readFile } from "node:fs/promises";

// load JSON data as an object of type T
export async function loadJsonFile<T>(url: URL) {
  const raw = await readFile(url, {
    encoding: "utf-8",
  });
  return JSON.parse(raw) as T;
}
