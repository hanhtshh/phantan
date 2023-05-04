import React from 'react';
import { Link } from 'react-router-dom';
import {
  TableCell,
  TableBody,
  TableRow,
  Badge,
  Avatar,
} from '@windmill/react-ui';
import { FiEye } from 'react-icons/fi';

import Tooltip from '../tooltip/Tooltip';
import MainModal from '../modal/MainModal';
import MainDrawer from '../drawer/MainDrawer';
import ProductDrawer from '../drawer/ProductDrawer';
import ShowHideButton from '../table/ShowHideButton';
import EditDeleteButton from '../table/EditDeleteButton';
import useToggleDrawer from '../../hooks/useToggleDrawer';

const ProductTable = ({ products }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  console.log(products)

  return (
    <>
      <MainModal id={serviceId} />
      <MainDrawer>
        <ProductDrawer id={serviceId} />
      </MainDrawer>
      <TableBody>
        {products?.map((product, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <span className="text-xs uppercase font-semibold">
                {' '}
                {product._id.substring(18, 26)}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <Avatar
                  className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                  src={product?.image[0]}
                  alt={product?.name}
                />
                {product?.name}
              </div>
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">{product?.category?.name}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">{product?.price}vnđ</span>
            </TableCell>
            <TableCell>
              <span className="text-sm font-semibold">{product?.sale}vnđ</span>
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={product._id}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default React.memo(ProductTable);
