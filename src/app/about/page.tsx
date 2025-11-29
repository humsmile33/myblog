import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-12">
            <section className="text-center space-y-6">
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl">
                    {/* Placeholder for profile image */}
                    <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-4xl">
                        👋
                    </div>
                </div>
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">About Me</h1>
                    <p className="text-slate-600 dark:text-slate-400">Developer & Writer</p>
                </div>
            </section>

            <section className="prose prose-slate dark:prose-invert mx-auto">
                <p>
                    안녕하세요! 저는 웹 개발과 디자인에 관심이 많은 개발자입니다.
                    이 블로그는 Next.js와 Tailwind CSS를 사용하여 만들었으며, 제가 배운 것들을 기록하고 공유하는 공간입니다.
                </p>
                <p>
                    주로 다루는 주제는 다음과 같습니다:
                </p>
                <ul>
                    <li>Web Development (React, Next.js)</li>
                    <li>UI/UX Design</li>
                    <li>Productivity</li>
                </ul>
                <p>
                    궁금한 점이 있거나 소통하고 싶다면 언제든 연락주세요!
                </p>
            </section>
        </div>
    );
}
