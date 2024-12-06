'use server';
import { CategoriesWithProductsResponse } from '@/app/admin/categories/categories.types';
import { CreateCategorySchemaServer } from '@/app/admin/categories/create-category.schema';
import { createClient } from '@/supabase/server';
import slugify from 'slugify';

export const getCategoriesWithProducts =
  async (): Promise<CategoriesWithProductsResponse> => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('category')
      .select('* , products:product(*)')
      .returns<CategoriesWithProductsResponse>();

    if (error) throw new Error(`Error fetching categories: ${error.message}`);

    return data || [];
  };

export const imageUploadHandler = async (formData: FormData) => {
  if (!formData) return;

  const fileEntry = formData.get('file');
  if (!(fileEntry instanceof File)) throw new Error('Expected a file');

  const fileName = fileEntry.name;
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.storage
      .from('app-images')
      .upload(fileName, fileEntry, {
        cacheControl: '3600',
        upsert: false,
      });
    if (error) {
      console.log('Error uploading image', error);
      throw new Error('Error uploading image');
    }

    const {
      data: { publicUrl },
    } = await supabase.storage.from('app-images').getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.log('Error uploading image', error);
    throw new Error('Error uploading image');
  }
};

export const createCategory = async ({
  imageUrl,
  name,
}: CreateCategorySchemaServer) => {
  const supabase = await createClient();
  const slug = slugify(name, { lower: true });

  const { data, error } = await supabase.from('category').insert({
    name,
    imageUrl,
    slug,
  });

  if (error) throw new Error(`Error creating category: ${error.message}`);

  return data;
};