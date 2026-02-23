import { z } from "zod";

export const validRoles = [
  "scrum_product_owner",
  "scrum_master",
  "ui_ux_designer",
  "web_developer",
  "python_developer",
];

export const flashcardSchema = z.object({
  id: z.number(),
  question: z.string(),
  options: z.record(z.enum(["A", "B", "C", "D"]), z.string()),
  answer: z.string(),
  rationale: z.string(),
});

export const roleSchema = z.object({
  role: z.string(),
  focus: z.string(),
  flashcards: z.array(flashcardSchema),
});

export type Provider =
  | "github"
  | "apple"
  | "discord"
  | "facebook"
  | "google"
  | "microsoft"
  | "spotify"
  | "twitch"
  | "twitter"
  | "dropbox"
  | "linkedin"
  | "gitlab"
  | "tiktok"
  | "reddit"
  | "roblox"
  | "vk"
  | "kick";
