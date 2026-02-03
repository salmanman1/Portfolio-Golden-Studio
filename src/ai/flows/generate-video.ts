'use server';

/**
 * @fileOverview A flow that generates cinematic videos from text prompts using Google Veo.
 *
 * - generateVideo - A function that handles the video generation process.
 * - GenerateVideoInput - The input type (text prompt).
 * - GenerateVideoOutput - The return type (data URI of the mp4 video).
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

const GenerateVideoInputSchema = z.object({
  prompt: z.string().describe('A detailed description of the cinematic video to generate.'),
});
export type GenerateVideoInput = z.infer<typeof GenerateVideoInputSchema>;

const GenerateVideoOutputSchema = z.object({
  videoUrl: z.string().describe('The generated video as a data URI.'),
});
export type GenerateVideoOutput = z.infer<typeof GenerateVideoOutputSchema>;

export async function generateVideo(input: GenerateVideoInput): Promise<GenerateVideoOutput> {
  return generateVideoFlow(input);
}

const generateVideoFlow = ai.defineFlow(
  {
    name: 'generateVideoFlow',
    inputSchema: GenerateVideoInputSchema,
    outputSchema: GenerateVideoOutputSchema,
  },
  async (input) => {
    // Calling Google Veo 2.0 model
    let { operation } = await ai.generate({
      model: googleAI.model('veo-2.0-generate-001'),
      prompt: input.prompt,
      config: {
        durationSeconds: 5,
        aspectRatio: '16:9',
      },
    });

    if (!operation) {
      throw new Error('Expected the model to return an operation');
    }

    // Polling for completion
    while (!operation.done) {
      operation = await ai.checkOperation(operation);
      if (!operation.done) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }

    if (operation.error) {
      throw new Error('Failed to generate video: ' + operation.error.message);
    }

    const videoPart = operation.output?.message?.content.find((p) => !!p.media);
    if (!videoPart || !videoPart.media) {
      throw new Error('Failed to find the generated video in model output');
    }

    // Fetch the video data. Note: In a production environment, you might use a more robust way to handle binary data.
    // Here we fetch and convert to base64 to return as a data URI.
    const videoResponse = await fetch(`${videoPart.media.url}&key=${process.env.GEMINI_API_KEY}`);
    if (!videoResponse.ok) {
      throw new Error('Failed to fetch generated video content');
    }

    const arrayBuffer = await videoResponse.arrayBuffer();
    const base64Video = Buffer.from(arrayBuffer).toString('base64');

    return {
      videoUrl: `data:video/mp4;base64,${base64Video}`,
    };
  }
);
