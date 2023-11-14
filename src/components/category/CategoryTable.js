import React from 'react';
import { TableBody, TableRow, TableCell, Avatar, Button } from '@windmill/react-ui';

import MainModal from '../modal/MainModal';
import MainDrawer from '../drawer/MainDrawer';
import ShowHideButton from '../table/ShowHideButton';
import CategoryDrawer from '../drawer/CategoryDrawer';
import useToggleDrawer from '../../hooks/useToggleDrawer';
import EditDeleteButton from '../table/EditDeleteButton';
import axios from 'axios';
import { SERVER_HOSt } from '../../services/httpService';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { notifyError } from '../../utils/toast';

const CategoryTable = ({ categories }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const history = useHistory();

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
            <TableCell className="text-sm "><Button onClick={async () => {
              const maNv = localStorage.getItem('maNv');

              if (maNv) {
                try {
                  const result = await axios.post(`${SERVER_HOSt}/api/ve/giao-dich`, {
                    "maNv": maNv,
                    "maKh": parent.maKh
                  });
                  localStorage.setItem('maBanVe', result.data?.data?.maBV);
                  history.push('/movies-list')
                }
                catch (error) {
                  console.log(error);
                  notifyError('Có lỗi xảy ra, vui lòng thử laij')
                }

              }
              else {
                notifyError("Vui lòng đăng nhập để thực hiện chức năng")
              }



            }}>Chọn</Button></TableCell>
          </TableRow>
        ))}
      </TableBody >
    </>
  );
};

export default CategoryTable;
