'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
];

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass transition-all duration-300">
            <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold tracking-tight hover:text-indigo-500 transition-colors">
                    MyBlog
                </Link>

                <nav className="flex gap-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));

                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={clsx(
                                    'relative px-4 py-2 text-sm font-medium rounded-full transition-colors',
                                    isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                                )}
                            >
                                {item.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-indigo-50 dark:bg-indigo-900/20 rounded-full -z-10"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}
