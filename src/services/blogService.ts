import {
  ref,
  push,
  set,
  get,
  child,
  update,
} from "firebase/database";
import { auth } from "./firebase";
import { db } from "./firebase";
import type { Blog, CreateBlogInput } from "../types/blog.types";


export const getBlogs = async (): Promise<Blog[]> => {
  try {
    const snapshot = await get(ref(db, "blogs"));

    if (!snapshot.exists()) return [];

    const data = snapshot.val();


    return Object.entries(data).map(([id, value]) => ({
      id,
      ...(value as Omit<Blog, "id">),
    }));
  } catch (error) {
    console.error("Get blogs error:", error);
    throw error;
  }
};


export const getBlogById = async (id: string): Promise<Blog | null> => {
  try {
    const snapshot = await get(child(ref(db), `blogs/${id}`));

    if (!snapshot.exists()) return null;

    return {
      id,
      ...(snapshot.val() as Omit<Blog, "id">),
    };
  } catch (error) {
    console.error("Get blog error:", error);
    throw error;
  }
};



export const createBlog = async (
  data: CreateBlogInput
): Promise<Blog> => {
  try {
    console.log("STEP 1: createBlog called");
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User not authenticated");
    }

    const newBlogRef = push(ref(db, "blogs"));

    const blogData = {
      ...data,
      authorId: user.uid,
      author: user.displayName ?? undefined,
      createdAt: new Date().toISOString(),
    };

    await set(newBlogRef, blogData);

    console.log("STEP 2: blog created", newBlogRef.key);

    return {
      id: newBlogRef.key as string,
      ...blogData,
    };
  } catch (error) {
    console.error("Create blog error:", error);
    throw error;
  }
};



export const updateBlog = async (
  id: string,
  data: Partial<Blog>
): Promise<void> => {
  try {
    await update(ref(db, `blogs/${id}`), data);
  } catch (error) {
    console.error("Update blog error:", error);
    throw error;
  }
};


export const getBlogsByUser = async (
  userId: string
): Promise<Blog[]> => {
  const snapshot = await get(ref(db, "blogs"));

  if (!snapshot.exists()) return [];

  const data = snapshot.val();

  return Object.entries(data)
    .map(([id, value]) => ({
      id,
      ...(value as Omit<Blog, "id">),
    }))
    .filter((blog) => blog.authorId === userId);
};