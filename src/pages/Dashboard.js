import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Pagination,
} from '@windmill/react-ui';
import { ImStack, ImCreditCard } from 'react-icons/im';
import { FiShoppingCart, FiTruck, FiRefreshCw, FiCheck } from 'react-icons/fi';

import useAsync from '../hooks/useAsync';
import useFilter from '../hooks/useFilter';
import OrderServices from '../services/OrderServices';
import Loading from '../components/preloader/Loading';
import ChartCard from '../components/chart/ChartCard';
import CardItem from '../components/dashboard/CardItem';
import PageTitle from '../components/Typography/PageTitle';
import OrderTable from '../components/dashboard/OrderTable';
import CardItemTwo from '../components/dashboard/CardItemTwo';
import { barOptions, doughnutOptions } from '../utils/chartsData';

const Dashboard = () => {
  const { data, loading } = useAsync(OrderServices.getAllOrders);
  console.log(data)

  const {
    handleChangePage,
    totalResults,
    resultsPerPage,
    dataTable,
    pending,
    processing,
    delivered,
    todayOrder,
    monthlyOrder,
    totalOrder,
  } = useFilter(data?.data || []);

  return (
    <>
      <PageTitle>Dashboard Overview</PageTitle>

      <div className="grid gap-4 mb-8 md:grid-cols-3 xl:grid-cols-3">
        <CardItemTwo
          title="Doanh thu hôm nay"
          Icon={ImStack}
          price={todayOrder}
          className="text-white dark:text-green-100 bg-teal-500"
        />
        <CardItemTwo
          title="Doanh thu tháng này"
          Icon={FiShoppingCart}
          price={monthlyOrder}
          className="text-white dark:text-green-100 bg-blue-500"
        />
        <CardItemTwo
          title="Tổng doanh thu"
          Icon={ImCreditCard}
          price={totalOrder}
          className="text-white dark:text-green-100 bg-green-500"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <CardItem
          title="Total Order"
          Icon={FiShoppingCart}
          quantity={dataTable.length}
          className="text-orange-600 dark:text-orange-100 bg-orange-100 dark:bg-orange-500"
        />
        <CardItem
          title="Order Pending"
          Icon={FiRefreshCw}
          quantity={pending.length}
          className="text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500"
        />
        <CardItem
          title="Order Processing"
          Icon={FiTruck}
          quantity={processing.length}
          className="text-teal-600 dark:text-teal-100 bg-teal-100 dark:bg-teal-500"
        />
        <CardItem
          title="Order Delivered"
          Icon={FiCheck}
          quantity={delivered.length}
          className="text-green-600 dark:text-green-100 bg-green-100 dark:bg-green-500"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 my-8">
        <ChartCard title="Thống kê đơn hàng trong năm">
          <Bar {...barOptions} />
        </ChartCard>
        <ChartCard title="Thống kê đơn hàng trong tháng">
          <Doughnut {...doughnutOptions} className="chart" />
        </ChartCard>
      </div>

      <PageTitle>Đơn hàng gần nhất</PageTitle>
      {loading && <Loading loading={loading} />}
      {dataTable && !loading && (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Tên khách hàng</TableCell>
                <TableCell>Ngày đặt hàng</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Địa chỉ</TableCell>
                <TableCell>Giá trị đơn hàng</TableCell>
                <TableCell>Trạng thái</TableCell>
              </tr>
            </TableHeader>
            <OrderTable orders={dataTable} />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      )}
    </>
  );
};

export default Dashboard;
