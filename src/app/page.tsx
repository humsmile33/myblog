import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { format, parseISO } from 'date-fns';

export default function Home() {
  const posts = getAllPosts().slice(0, 3); // Latest 3 posts

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Welcome to <span className="text-indigo-600 dark:text-indigo-400">MyBlog</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Sharing thoughts on technology, design, and life. <br />
          Explore the latest stories and tutorials.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/blog"
            className="px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30"
          >
            Read Blog
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-full font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            About Me
          </Link>
        </div>
      </section>

      {/* Latest Posts */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Latest Posts</h2>
          <Link href="/blog" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
            View all →
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <article className="h-full flex flex-col bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300">
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-3">
                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-md text-slate-700 dark:text-slate-300">
                      {post.category}
                    </span>
                    <time dateTime={post.date}>
                      {format(parseISO(post.date), 'MMM d, yyyy')}
                    </time>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-4 flex-grow">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {post.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs text-slate-400">#{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
