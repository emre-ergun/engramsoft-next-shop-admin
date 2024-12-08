import { getOrdersWithProducts } from '@/actions/orders';

const Orders = async () => {
  const ordersWithProducts = await getOrdersWithProducts();

  if (!ordersWithProducts)
    return (
      <div className='text-center font-bold text-2xl'>No Orders Found</div>
    );

  return <div>Orders</div>;
};

export default Orders;
