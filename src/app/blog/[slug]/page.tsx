import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { format, parseISO } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import 'highlight.js/styles/github-dark.css'; // Code highlight style
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function PostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="max-w-3xl mx-auto">
            <header className="mb-10 text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                    <span className="font-medium text-indigo-600 dark:text-indigo-400">{post.category}</span>
                    <span>•</span>
                    <time dateTime={post.date}>{format(parseISO(post.date), 'MMMM d, yyyy')}</time>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                    {post.title}
                </h1>
                <div className="flex justify-center gap-2">
                    {post.tags.map(tag => (
                        <span key={tag} className="text-sm text-slate-400">#{tag}</span>
                    ))}
                </div>
            </header>

            <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-500">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight, rehypeSlug]}
                    components={{
                        img: ({ node, ...props }) => (
                            <span className="block my-8">
                                <img {...props} className="rounded-xl shadow-lg mx-auto" alt={props.alt || ''} />
                            </span>
                        )
                    }}
                >
                    {post.content}
                </ReactMarkdown>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-between">
                <Link href="/blog" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
                    ← Back to Blog
                </Link>
            </div>
        </article>
    );
}
