import { getOrdersWithProducts } from '@/actions/orders';
import OrdersPageComponent from './page-component';

const Orders = async () => {
  const ordersWithProducts = await getOrdersWithProducts();

  if (!ordersWithProducts)
    return (
      <div className='text-center font-bold text-2xl'>No Orders Found</div>
    );

  return (
    <div>
      <OrdersPageComponent ordersWithProducts={ordersWithProducts} />
    </div>
  );
};

export default Orders;
