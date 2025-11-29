import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { parseISO, format } from 'date-fns';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface Post {
    slug: string;
    title: string;
    date: string;
    category: string;
    tags: string[];
    description: string;
    thumbnail?: string;
    content: string;
}

export function getAllPosts(): Post[] {
    // Create posts directory if it doesn't exist
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);

            return {
                slug,
                content,
                title: data.title || '',
                date: data.date || '',
                category: data.category || 'Uncategorized',
                tags: data.tags || [],
                description: data.description || '',
                thumbnail: data.thumbnail,
            } as Post;
        });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getPostBySlug(slug: string): Post | null {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.md`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            content,
            title: data.title || '',
            date: data.date || '',
            category: data.category || 'Uncategorized',
            tags: data.tags || [],
            description: data.description || '',
            thumbnail: data.thumbnail,
        } as Post;
    } catch (e) {
        return null;
    }
}

export function getPostsByCategory(category: string): Post[] {
    const allPosts = getAllPosts();
    return allPosts.filter((post) => post.category === category);
}

export function getPostsByTag(tag: string): Post[] {
    const allPosts = getAllPosts();
    return allPosts.filter((post) => post.tags.includes(tag));
}

export function getPostsGroupedByMonth(): Record<string, Post[]> {
    const allPosts = getAllPosts();
    const grouped: Record<string, Post[]> = {};

    allPosts.forEach((post) => {
        const date = parseISO(post.date);
        const key = format(date, 'yyyy-MM'); // Group by Year-Month
        if (!grouped[key]) {
            grouped[key] = [];
        }
        grouped[key].push(post);
    });

    return grouped;
}

export function getAllCategories(): string[] {
    const posts = getAllPosts();
    const categories = new Set(posts.map((post) => post.category));
    return Array.from(categories);
}

export function getAllTags(): string[] {
    const posts = getAllPosts();
    const tags = new Set(posts.flatMap((post) => post.tags));
    return Array.from(tags);
}
