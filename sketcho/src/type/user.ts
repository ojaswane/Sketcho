import { combinedSlug } from "@/lib/utils";
export type ConvexUserRaw = {
  _creationTime: number;
  _id: string;
  email?: string;
  emailVerificationTime?: number;
  image?: string;
  name?: string;
};

export type Profile = {
  id: string; // normalized from _id
  createdAtMs: number; // from _creationTime
  email?: string;
  emailVerifiedAtMs?: number; // from emailVerificationTime
  image?: string;
  name?: string;
};

export const normalizeProfile = (
  raw: ConvexUserRaw | null
): Profile | null => {
  if (!raw) return null;

  // we are slicing the name from te email itself:
  const extractNameFromEmail = (email: string): string => {
    const username = email.split('@')[0];
    return username
      .split(/[._-]/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(' ');
  };

  const baseName =
    (raw.name && raw.name.length > 0 ? raw.name : undefined) ??
    (raw.email ? extractNameFromEmail(raw.email) : undefined);

  const name = baseName ? combinedSlug(baseName) : undefined;
  return {
    id: raw._id,
    createdAtMs: raw._creationTime,
    email: raw.email,
    emailVerifiedAtMs: raw.emailVerificationTime ?? undefined,
    image: raw.image,
    name, 
  };
};