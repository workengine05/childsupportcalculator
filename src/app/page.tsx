import Image from 'next/image';
import StateList from '@/components/state-list';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const faqs = [
  {
    question: 'What is a child support calculator?',
    answer:
      'A child support calculator is an online tool that estimates the amount of child support that may be ordered by a court. It uses a state-specific formula based on factors like parental income, custody arrangements, and number of children.',
  },
  {
    question: 'Are these calculators accurate?',
    answer:
      "While our calculators use state-approved formulas to provide a reliable estimate, the final amount can be affected by numerous factors and is ultimately determined by a judge. It's best used as a financial planning tool.",
  },
  {
    question: 'Do I need a lawyer to determine child support?',
    answer:
      'It is highly recommended to consult with a family law attorney. A lawyer can provide legal advice specific to your situation, ensure all factors are considered, and represent you in court proceedings.',
  },
  {
    question: 'How often can child support be recalculated?',
    answer:
      'Child support orders can typically be reviewed and modified if there is a significant change in circumstances, such as a job loss, a substantial increase in income, or a change in custody. State laws vary on the frequency and requirements for modification.',
  },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === "hero-family")
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-primary">
          Child Support Calculator
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Free, accurate, and easy-to-use child support calculators for every state.
          Get a reliable estimate of your financial obligations in minutes.
        </p>
      </section>

      <section className="mb-16">
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold font-headline mb-4">
                Understanding Child Support
              </h2>
              <p className="text-muted-foreground mb-4">
                Child support is a legal obligation for parents to provide financial support for their children. The amount is determined by state-specific guidelines that consider various factors, primarily the parents' incomes and the amount of time each parent spends with the children.
              </p>
              <p className="text-muted-foreground">
                Our tools simplify this complex process, providing a clear estimate based on your state's latest formulas. This helps parents plan for the future and understand their financial responsibilities.
              </p>
            </div>
            {heroImage &&
              <div className="relative min-h-[300px] md:min-h-0">
                  <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    data-ai-hint={heroImage.imageHint}
                    fill
                    className="object-cover"
                  />
              </div>
            }
          </div>
        </Card>
      </section>

      <section id="states" className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-8">
          Find Your State Calculator
        </h2>
        <StateList />
      </section>

      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-8">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
