import { getCategoriesWithProducts } from '@/actions/categories';
import { getProductsWithCategories } from '@/actions/products';
import { ProductPageComponent } from '@/app/admin/products/page-component';

const Products = async () => {
  const categories = await getCategoriesWithProducts();
  const productsWithCategories = await getProductsWithCategories();

  return (
    <ProductPageComponent
      categories={categories}
      productsWithCategories={productsWithCategories}
    />
  );
};

export default Products;
