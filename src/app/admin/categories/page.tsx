import { getCategoriesWithProducts } from '@/actions/categories';
import React from 'react';
import CategoryPageComponent from '@/app/admin/categories/page-component';

const Categories = async () => {
  const categories = await getCategoriesWithProducts();

  return <CategoryPageComponent categories={categories} />;
};

export default Categories;
