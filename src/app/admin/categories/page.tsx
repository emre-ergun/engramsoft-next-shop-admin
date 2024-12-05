import { getCategoriesWithProducts } from '@/actions/categories';
import React from 'react';

const Categories = async () => {
  const categories = await getCategoriesWithProducts();
  console.log(categories);

  return <>Categories</>;
};

export default Categories;
