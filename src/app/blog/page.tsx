import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import Link from "next/link";

const articles = [
    {
        slug: "how-child-support-works",
        title: "How Child Support Works in the US",
        description: "A comprehensive guide to understanding the systems and laws governing child support across the nation.",
        image: PlaceHolderImages.find(p => p.id === "blog-post-1"),
    },
    {
        slug: "calculator-vs-attorney",
        title: "Calculator vs. Attorney: What's the Difference?",
        description: "Explore the pros and cons of using an online calculator versus hiring a family law attorney for your child support case.",
        image: PlaceHolderImages.find(p => p.id === "blog-post-2"),
    },
    {
        slug: "top-10-mistakes",
        title: "Top 10 Mistakes Parents Make with Child Support",
        description: "Avoid common pitfalls. Learn about frequent errors parents make during child support proceedings and how to prevent them.",
        image: PlaceHolderImages.find(p => p.id === "blog-post-3"),
    },
]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground">
                State Support Blog
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mt-2">
                Insights and advice on navigating child support.
            </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
               <Link href={`/blog/${article.slug}`} key={index}>
                    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-1">
                        {article.image && (
                            <div className="relative h-48 w-full">
                                <Image
                                    src={article.image.imageUrl}
                                    alt={article.image.description}
                                    data-ai-hint={article.image.imageHint}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle>{article.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground">{article.description}</p>
                        </CardContent>
                        <div className="p-6 pt-0">
                            <p className="text-primary font-semibold group-hover:underline">Read More &rarr;</p>
                        </div>
                    </Card>
               </Link>
            ))}
        </div>
        <div className="text-center mt-12 text-lg text-muted-foreground">
            <p>More articles coming soon!</p>
        </div>
    </div>
  );
}
