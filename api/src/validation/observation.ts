import { z } from 'zod';

const bodyPartSchema = z.object({
  part: z.string(),
  position: z.object({
    x: z.number(),
    y: z.number(),
    z: z.number().optional()
  }),
  confidence: z.number().min(0).max(1)
});

export const observationSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  bodyParts: z.array(bodyPartSchema),
  confidence: z.number().min(0).max(1)
});

export type ObservationInput = z.infer<typeof observationSchema>;

export function validateObservation(data: unknown) {
  return observationSchema.parse(data);
}
