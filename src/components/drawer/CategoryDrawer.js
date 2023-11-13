import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import ReactTagInput from '@pathofdev/react-tag-input';

import Error from '../form/Error';
import Title from '../form/Title';
import InputArea from '../form/InputArea';
import LabelArea from '../form/LabelArea';
import SelectOption from '../form/SelectOption';
import DrawerButton from '../form/DrawerButton';
import useCategorySubmit from '../../hooks/useCategorySubmit';
import UploaderSingle from '../image-uploader/UploaderSingle';

const CategoryDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
  } = useCategorySubmit(id);

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title="Cập nhật danh mục sản phẩm"
            description="Cập nhật thông tin danh mục sản phẩm tại đây"
          />
        ) : (
          <Title
            title="Thêm khách hàng"
            description="Thêm thông tin khách hàng tại đây"
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}>
          <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
            {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Category Icon" />
              <div className="col-span-8 sm:col-span-4">
                <UploaderSingle imageUrl={imageUrl} setImageUrl={setImageUrl} />
              </div>
            </div> */}

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Mã khách hàng" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  required="false"
                  label="Mã khách hàng"
                  name="name"
                  type="text"
                  placeholder="Mã khách hàng"
                />
                <Error errorName={errors.category} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Tên khách hàng" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  required="false"
                  label="Tên khách hàng"
                  name="name"
                  type="text"
                  placeholder="Tên khách hàng"
                />
                <Error errorName={errors.category} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Địa chỉ" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  required="false"
                  label="Địa chỉ"
                  name="name"
                  type="text"
                  placeholder="Địa chỉ"
                />
                <Error errorName={errors.category} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Ngày sinh" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  required="false"
                  label="Ngày sinh"
                  name="name"
                  type="text"
                  placeholder="Ngày sinh"
                />
                <Error errorName={errors.category} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Số điện thoại" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  required="false"
                  label="Số điện thoại"
                  name="name"
                  type="text"
                  placeholder="Số điện thoại"
                />
                <Error errorName={errors.category} />
              </div>
            </div>



          </div>

          <DrawerButton id={id} title="khách hàng" />
        </form>
      </Scrollbars>
    </>
  );
};

export default CategoryDrawer;
