import React from 'react';
import * as dayjs from 'dayjs';
import { TableCell, TableBody, TableRow } from '@windmill/react-ui';
import Status from '../table/Status';
import { formatVND } from '../../services/OrderServices';

const OrderTable = ({ orders }) => {
  return (
    <>
      <TableBody>
        {orders?.map((order) => (
          <TableRow key={order._id}>
            <TableCell>
              <span className="text-sm">
                {order?.customer?.name}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm ">{order.oder_date}</span>
            </TableCell>
            <TableCell>
              {' '}
              <span className="text-sm">{order.telephone}</span>{' '}
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {order.address}
              </span>
            </TableCell>
            <TableCell>
              {' '}
              <span className="text-sm font-semibold">
                {formatVND(order.cost)}
              </span>{' '}
            </TableCell>
            <TableCell>
              <Status status={order.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default OrderTable;
