import React from "react";

interface PageContainerProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
    className?: string;
}

export default function PageContainer({children,title,description,className}: PageContainerProps){
    return (
        <main className="flex-1 w-full bg-zinc-950 text-zinc-100 min-h-screen py-10 px-4 md:px-8">
            <div className="max-w-6xl mx-auto flex flex-col gap-8">
                {(title || description) && (
                    <div className="flex flex-col gap-2 border-b border-zinc-800 pb-6">
                        {title && (
                            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-linear-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                                {title}
                            </h1>
                        )}
                        {description && (
                            <p className="text--sm md:text-base text-zinc-400 font-light">
                                {description}
                            </p>
                        )}
                    </div>
                )}
                <div className="w-full">
                    {children}
                </div>
            </div>
        </main>
    )
}