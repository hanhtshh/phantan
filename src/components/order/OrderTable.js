import React from 'react';
import { Link } from 'react-router-dom';
import * as dayjs from 'dayjs';
import { TableCell, TableBody, TableRow } from '@windmill/react-ui';

import Status from '../table/Status';
import { FiEye } from 'react-icons/fi';
import Tooltip from '../tooltip/Tooltip';
import SelectStatus from '../form/SelectStatus';
import SelectDeliveryBoy from '../form/SelectDeliveryBoy';
import { formatVND } from '../../services/OrderServices';

const OrderTable = ({ orders }) => {
  return (
    <>
      <TableBody>
        {orders?.map((order, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <span className="text-sm">{order._id.substring(20, 25)}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{order.customer?.name}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{order.telephone}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm">{order.address}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{order.oder_date}</span>
            </TableCell>
            <TableCell>
              {' '}
              <span className="text-sm font-semibold">
                {formatVND(order?.cost)}

              </span>{' '}
            </TableCell>
            <TableCell className="text-center">
              {order?.paypalStatus ? "Paypal" : "COD"}
            </TableCell>
            <TableCell className="text-center text-xs">
              <Status status={order.status} />
            </TableCell>

            <TableCell className="text-center">
              <SelectStatus id={order._id} />
            </TableCell>

            <TableCell className="text-right flex justify-end">
              <div className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                {' '}
                <Link to={`/order/${order._id}`}>
                  <Tooltip
                    id="view"
                    Icon={FiEye}
                    title="View Invoice"
                    bgColor="#34D399"
                  />
                </Link>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default OrderTable;
