import { z } from 'zod';

export const createCategorySchema = z.object({
  image: z.any().refine(file => file.length === 1, 'Image is required'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;

export const createCategorySchemaServer = z.object({
  imageUrl: z.string().min(1, 'Image URL is required'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export type CreateCategorySchemaServer = z.infer<
  typeof createCategorySchemaServer
>;
