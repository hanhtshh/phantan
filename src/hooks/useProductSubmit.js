import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SidebarContext } from '../context/SidebarContext';
import ProductServices from '../services/ProductServices';
import { notifyError, notifySuccess } from '../utils/toast';

const useProductSubmit = (id) => {
  const [image, setImage] = useState([]);
  const [size, setSize] = useState([]);
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    if (getValues('price') < getValues('sale')) {
      notifyError('SalePrice must be less then or equal of product price!');
      return;
    }

    const productData = {
      name: getValues('name'),
      image: image,
      describes: getValues('describes'),
      price: getValues('price'),
      sale: getValues('sale'),
      category: getValues('category'),
      size: size
    };

    if (id) {
      ProductServices.updateProduct(id, productData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      ProductServices.addProduct(productData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue('sku');
      setValue('name');
      setValue('category');
      setValue('describes');
      setValue('price');
      setValue('sale');
      clearErrors('sku');
      clearErrors('name');
      clearErrors('category');
      clearErrors('describes');
      clearErrors('price');
      clearErrors('sale');
      return;
    }

    if (id) {
      ProductServices.getProductById(id)
        .then((res) => {
          if (res) {
            setValue('sku', res?.item._id.substring(18, 26));
            setValue('name', res?.item.name);
            setValue('category', res?.item.category.name);
            setValue('describes', res?.item.describes);
            setValue('price', res?.item.price);
            setValue('sale', res?.item.sale);
            setImage(res?.item.image);
            setSize(res?.item.size);

          }
        })
        .catch((err) => {
          notifyError('There is a server error!');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen]);

  return {
    register,

    handleSubmit,
    onSubmit,
    errors,
    image,
    setImage,
    size,
    setSize,
  };
};

export default useProductSubmit;
