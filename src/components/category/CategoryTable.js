import React from 'react';
import { TableBody, TableRow, TableCell, Avatar } from '@windmill/react-ui';

import MainModal from '../modal/MainModal';
import MainDrawer from '../drawer/MainDrawer';
import ShowHideButton from '../table/ShowHideButton';
import CategoryDrawer from '../drawer/CategoryDrawer';
import useToggleDrawer from '../../hooks/useToggleDrawer';
import EditDeleteButton from '../table/EditDeleteButton';

const CategoryTable = ({ categories }) => {
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
              {parent.maKh}
            </TableCell>
            <TableCell className="text-sm ">{parent.ten}</TableCell>
            <TableCell className="text-sm ">{parent.diaChi}</TableCell>
            <TableCell className="text-sm ">{parent.ngaySinh}</TableCell>
            <TableCell className="text-sm ">{parent.sdt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CategoryTable;
