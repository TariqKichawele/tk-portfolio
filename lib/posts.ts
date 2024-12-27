import path from "path";
import fs from "fs";
import matter from "gray-matter";

const rootDirectory = path.join(process.cwd(), 'content', 'posts');

export type Post = {
    metadata: PostMetadata
    content: string
}

export type PostMetadata = {
    title?: string
    summary?: string
    image?: string
    author?: string
    publishedAt?: string
    slug: string
}



export async function getPostBySlug(slug: string): Promise<Post | null> {
    const filePath = path.join(rootDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, { encoding: 'utf-8' });

    const { data, content } = matter(fileContents);
    
    return { metadata: { slug, ...data }, content };
}