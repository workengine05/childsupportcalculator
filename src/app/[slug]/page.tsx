import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { states } from '@/lib/states';
import { getCachedStateSEOMeta } from '@/lib/seo';
import Calculator from '@/components/calculator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function generateStaticParams() {
  return states.map((state) => ({
    slug: state.slug,
  }));
}

function getStateData(slug: string) {
  return states.find((s) => s.slug === slug);
}

function formatFaqContent(faqs: { question: string; answer: string }[]) {
  return faqs.map(faq => `Q: ${faq.question}\nA: ${faq.answer}`).join('\n\n');
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const state = getStateData(params.slug);
  if (!state) {
    return {};
  }

  const seoInput = {
    stateName: state.name,
    stateSpecificLawsIntro: state.content.intro,
    howSupportCalculated: state.content.howItWorks,
    updatesFor2025: state.content.updates2025,
    faqContent: formatFaqContent(state.faqs),
  };

  const seoData = await getCachedStateSEOMeta(seoInput);

  return {
    title: seoData.metaTitle,
    description: seoData.metaDescription,
    openGraph: {
        title: seoData.metaTitle,
        description: seoData.metaDescription,
        url: `/${state.slug}`, // Replace with actual domain later
    },
    twitter: {
        card: "summary_large_image",
        title: seoData.metaTitle,
        description: seoData.metaDescription,
    }
  };
}

export default async function StatePage({ params }: { params: { slug: string } }) {
  const state = getStateData(params.slug);

  if (!state) {
    notFound();
  }

   const seoInput = {
    stateName: state.name,
    stateSpecificLawsIntro: state.content.intro,
    howSupportCalculated: state.content.howItWorks,
    updatesFor2025: state.content.updates2025,
    faqContent: formatFaqContent(state.faqs),
  };
  const seoData = await getCachedStateSEOMeta(seoInput);

  return (
    <>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: seoData.faqSchema }}
      />
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
            {state.name} Child Support Calculator
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mt-2">
            An estimate based on the official 2025 guidelines for {state.name}.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Calculator />
          </div>

          <div className="space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle>How it Works in {state.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">{state.content.howItWorks}</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>2025 Guideline Updates</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">{state.content.updates2025}</p>
                </CardContent>
            </Card>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-16">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl font-headline text-center">
                        About {state.name} Child Support Laws
                    </CardTitle>
                    <CardDescription className="text-center pt-2">{state.content.intro}</CardDescription>
                </CardHeader>
                <CardContent>
                     <h3 className="text-xl font-bold font-headline text-center mb-6">
                        Frequently Asked Questions
                    </h3>
                    <Accordion type="single" collapsible className="w-full">
                        {state.faqs.map((faq, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="text-base text-left">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-base text-muted-foreground">
                                {faq.answer}
                            </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>

      </div>
    </>
  );
}
