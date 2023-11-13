import React from 'react';
import { TableBody, TableRow, TableCell } from '@windmill/react-ui';

import MainModal from '../modal/MainModal';
import MainDrawer from '../drawer/MainDrawer';
import CategoryDrawer from '../drawer/CategoryDrawer';
import useToggleDrawer from '../../hooks/useToggleDrawer';


const MovieTable = ({ categories }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      <MainModal id={serviceId} />
      <MainDrawer>
        <CategoryDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {categories?.map((parent) => (
          <TableRow key={parent.maChieu}>
            <TableCell className="font-semibold uppercase text-xs">
              {parent.maChieu}
            </TableCell>
            <TableCell className="text-sm ">{parent.maPhong}</TableCell>
            <TableCell className="text-sm ">{parent.maPhim}</TableCell>
            <TableCell className="text-sm ">{parent.giaSuatChieu}</TableCell>
            <TableCell className="text-sm ">{parent.thoiGianChieu}</TableCell>
            <TableCell className="text-sm ">{parent.tenPhim}</TableCell>
            <TableCell className="text-sm ">{parent.theLoai}</TableCell>
            <TableCell className="text-sm ">{parent.thoiLuong}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default MovieTable;
