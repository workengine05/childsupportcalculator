'use server';

/**
 * @fileOverview A Genkit flow for generating SEO-optimized meta titles and descriptions for state pages.
 *
 * - generateStateSEOMeta - A function that generates SEO meta information for a given state.
 * - GenerateStateSEOMetaInput - The input type for the generateStateSEOMeta function.
 * - GenerateStateSEOMetaOutput - The return type for the generateStateSEOMeta function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStateSEOMetaInputSchema = z.object({
  stateName: z.string().describe('The name of the state.'),
  stateSpecificLawsIntro: z.string().describe('Introductory content about state-specific child support laws.'),
  howSupportCalculated: z.string().describe('Explanation of how child support is calculated in the state.'),
  updatesFor2025: z.string().describe('Updates to child support laws for 2025 in the state.'),
  faqContent: z.string().describe('FAQ content for the state.'),
});
export type GenerateStateSEOMetaInput = z.infer<typeof GenerateStateSEOMetaInputSchema>;

const GenerateStateSEOMetaOutputSchema = z.object({
  metaTitle: z.string().describe('The SEO-optimized meta title for the state page.'),
  metaDescription: z.string().describe('The SEO-optimized meta description for the state page.'),
  faqSchema: z.string().describe('The FAQ schema markup for the state page.'),
  openGraphMetaTags: z.string().describe('The Open Graph meta tags for the state page.'),
  twitterMetaTags: z.string().describe('The Twitter meta tags for the state page.'),
});
export type GenerateStateSEOMetaOutput = z.infer<typeof GenerateStateSEOMetaOutputSchema>;

export async function generateStateSEOMeta(input: GenerateStateSEOMetaInput): Promise<GenerateStateSEOMetaOutput> {
  return generateStateSEOMetaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStateSEOMetaPrompt',
  input: {schema: GenerateStateSEOMetaInputSchema},
  output: {schema: GenerateStateSEOMetaOutputSchema},
  prompt: `You are an SEO expert specializing in generating meta titles, meta descriptions, FAQ schema markup, Open Graph meta tags, and Twitter meta tags for state-specific child support calculator pages.

  Given the following information about the state, generate the required SEO elements:

  State Name: {{{stateName}}}
  State-Specific Laws Intro: {{{stateSpecificLawsIntro}}}
  How Support is Calculated: {{{howSupportCalculated}}}
  Updates for 2025: {{{updatesFor2025}}}
  FAQ Content: {{{faqContent}}}

  Instructions:

  - The meta title should be concise (50-60 characters) and include the state name and the primary keyword \"Child Support Calculator\".
  - The meta description should be compelling (150-160 characters) and accurately describe the page's content, including state-specific details.
  - The FAQ schema markup should be a valid JSON-LD format.
  - Open Graph and Twitter meta tags should be optimized for social sharing.

  Output the results in a JSON format.
  {
    "metaTitle": "[Generated Meta Title]",
    "metaDescription": "[Generated Meta Description]",
    "faqSchema": "[Generated FAQ Schema Markup]",
    "openGraphMetaTags": "[Generated Open Graph Meta Tags]",
    "twitterMetaTags": "[Generated Twitter Meta Tags]"
  }
`,
});

const generateStateSEOMetaFlow = ai.defineFlow(
  {
    name: 'generateStateSEOMetaFlow',
    inputSchema: GenerateStateSEOMetaInputSchema,
    outputSchema: GenerateStateSEOMetaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
