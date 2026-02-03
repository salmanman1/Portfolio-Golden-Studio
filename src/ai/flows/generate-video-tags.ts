'use server';

/**
 * @fileOverview A flow that generates tags for a video using AI.
 *
 * - generateVideoTags - A function that generates tags for a video.
 * - GenerateVideoTagsInput - The input type for the generateVideoTags function.
 * - GenerateVideoTagsOutput - The return type for the generateVideoTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateVideoTagsInputSchema = z.object({
  videoTitle: z.string().describe('The title of the video.'),
  videoDescription: z.string().describe('A description of the video.'),
});
export type GenerateVideoTagsInput = z.infer<typeof GenerateVideoTagsInputSchema>;

const GenerateVideoTagsOutputSchema = z.object({
  tags: z.array(z.string()).describe('An array of tags for the video.'),
});
export type GenerateVideoTagsOutput = z.infer<typeof GenerateVideoTagsOutputSchema>;

export async function generateVideoTags(input: GenerateVideoTagsInput): Promise<GenerateVideoTagsOutput> {
  return generateVideoTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateVideoTagsPrompt',
  input: {schema: GenerateVideoTagsInputSchema},
  output: {schema: GenerateVideoTagsOutputSchema},
  prompt: `You are an expert in generating tags for videos.

  Given the title and description of a video, generate a list of relevant tags.
  The tags should be comma separated.

  Title: {{{videoTitle}}}
  Description: {{{videoDescription}}}

  Tags:`,
});

const generateVideoTagsFlow = ai.defineFlow(
  {
    name: 'generateVideoTagsFlow',
    inputSchema: GenerateVideoTagsInputSchema,
    outputSchema: GenerateVideoTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
