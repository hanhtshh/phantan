import React from 'react';
import { TableBody, TableRow, TableCell } from '@windmill/react-ui';

import MainModal from '../modal/MainModal';
import MainDrawer from '../drawer/MainDrawer';
import CategoryDrawer from '../drawer/CategoryDrawer';
import useToggleDrawer from '../../hooks/useToggleDrawer';


const CustomTable = ({ categories }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      <MainModal id={serviceId} />
      <MainDrawer>
        <CategoryDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {categories?.map((parent) => (
          <TableRow key={parent._id}>
            <TableCell className="font-semibold uppercase text-xs">
              {parent.maChieu}
            </TableCell>
            <TableCell className="text-sm ">{parent.name}</TableCell>
            <TableCell className="text-sm ">{parent.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CustomTable;
