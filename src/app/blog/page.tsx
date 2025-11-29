import Link from 'next/link';
import { getPostsGroupedByMonth, getAllCategories, getAllTags } from '@/lib/posts';
import { format, parse, parseISO } from 'date-fns';

export default function BlogPage() {
    const groupedPosts = getPostsGroupedByMonth();
    const categories = getAllCategories();
    const tags = getAllTags();

    // Sort months descending
    const sortedMonths = Object.keys(groupedPosts).sort((a, b) => b.localeCompare(a));

    return (
        <div className="space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Blog</h1>
                <p className="text-slate-600 dark:text-slate-400">All my thoughts and stories.</p>
            </div>

            {/* Categories & Tags Cloud */}
            <div className="flex flex-col md:flex-row gap-8 justify-center items-start md:items-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                            <Link
                                key={category}
                                href={`/categories/${category}`}
                                className="px-3 py-1 bg-white dark:bg-slate-700 text-sm rounded-full border border-slate-200 dark:border-slate-600 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                                {category}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="hidden md:block w-px h-12 bg-slate-200 dark:bg-slate-700"></div>
                <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                            <Link
                                key={tag}
                                href={`/tags/${tag}`}
                                className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                                #{tag}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Posts Grouped by Month */}
            <div className="space-y-12">
                {sortedMonths.map(month => {
                    const posts = groupedPosts[month];
                    const dateObj = parse(month, 'yyyy-MM', new Date());

                    return (
                        <section key={month} className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-700 space-y-8">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white dark:border-slate-900"></div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                                {format(dateObj, 'MMMM yyyy')}
                            </h2>

                            <div className="grid gap-6">
                                {posts.map(post => (
                                    <article key={post.slug} className="group flex flex-col md:flex-row gap-6 items-start">
                                        <div className="flex-grow space-y-2">
                                            <div className="flex items-center gap-3 text-xs text-slate-500">
                                                <span className="font-medium text-indigo-600 dark:text-indigo-400">{post.category}</span>
                                                <span>•</span>
                                                <time dateTime={post.date}>{format(parseISO(post.date), 'MMM d')}</time>
                                            </div>
                                            <Link href={`/blog/${post.slug}`}>
                                                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                    {post.title}
                                                </h3>
                                            </Link>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">
                                                {post.description}
                                            </p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>
        </div>
    );
}
