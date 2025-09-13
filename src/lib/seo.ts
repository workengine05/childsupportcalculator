'use server';

import { cache } from 'react';
import {
  generateStateSEOMeta,
  GenerateStateSEOMetaInput,
} from '@/ai/flows/generate-state-seo-meta';

export const getCachedStateSEOMeta = cache(
  async (input: GenerateStateSEOMetaInput) => {
    try {
      return await generateStateSEOMeta(input);
    } catch (error) {
      console.error('Error generating SEO meta:', error);
      // Return a default structure on error to prevent build failures
      return {
        metaTitle: `${input.stateName} Child Support Calculator`,
        metaDescription: `Calculate child support in ${input.stateName} with our free tool. Based on ${input.stateName}'s 2025 guidelines.`,
        faqSchema: '{}',
        openGraphMetaTags: '',
        twitterMetaTags: '',
      };
    }
  }
);
