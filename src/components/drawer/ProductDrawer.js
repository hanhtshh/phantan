import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Textarea, Select } from '@windmill/react-ui';
import ReactTagInput from '@pathofdev/react-tag-input';

import Title from '../form/Title';
import Error from '../form/Error';
import LabelArea from '../form/LabelArea';
import InputArea from '../form/InputArea';
import InputValue from '../form/InputValue';
import SelectOption from '../form/SelectOption';
import DrawerButton from '../form/DrawerButton';
import Uploader from '../image-uploader/Uploader';
import ChildrenCategory from '../category/ChildrenCategory';
import ParentCategory from '../category/ParentCategory';
import useProductSubmit from '../../hooks/useProductSubmit';
import TableCustom from './TableCustom';

const ProductDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    image,
    setImage,
    size,
    setSize,
  } = useProductSubmit(id);


  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title="Cập nhật sản phẩm"
            description="Cập nhật thông tin sản phẩm tại đây"
          />
        ) : (
          <Title
            title="Thêm sản phẩm"
            description="Thêm thông tin sản phẩm tại đây"
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }} className="block">
          <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Product Image" />
              <div className="col-span-8 sm:col-span-4">
                <Uploader image={image} setImage={setImage} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="SKU" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  required="true"
                  label="SKU"
                  name="sku"
                  type="text"
                  placeholder="Product title"
                />
                <Error errorName={errors.sku} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Tên sản phẩm" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  required="true"
                  label="Tên sản phẩm"
                  name="name"
                  type="text"
                  placeholder="Tên sản phẩm"
                />
                <Error errorName={errors.name} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Danh mục" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  required="false"
                  label="Danh mục"
                  name="category"
                  type="text"
                  placeholder="Danh mục"
                />
                <Error errorName={errors.category} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Mô tả" />
              <div className="col-span-8 sm:col-span-4">
                <Textarea
                  className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                  {...register('describes', {
                    required: 'Description is required!',
                    minLength: {
                      value: 20,
                      message: 'Minimum 20 character!',
                    },
                  })}
                  name="describes"
                  placeholder="Product details"
                  rows="4"
                  spellCheck="false"
                />
                <Error errorName={errors.describes} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Giá" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Giá"
                  name="price"
                  type="number"
                  placeholder="Giá"
                />
                <Error errorName={errors.unit} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Giá Sale" />
              <div className="col-span-8 sm:col-span-4">
                <InputValue
                  register={register}
                  maxValue={1000}
                  minValue={0}
                  label="Sale"
                  name="sale"
                  type="number"
                  placeholder="Sale"
                />
                <Error errorName={errors.quantity} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Size" />
              <div className="col-span-8 sm:col-span-4">

                <TableCustom data={size} setSize={setSize} />
              </div>
            </div>

          </div>

          <DrawerButton id={id} title="Product" />
        </form>
      </Scrollbars>
    </>
  );
};

export default React.memo(ProductDrawer);
