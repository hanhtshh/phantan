import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SidebarContext } from '../context/SidebarContext';
import CategoryServices from '../services/CategoryServices';
import { notifyError, notifySuccess } from '../utils/toast';

const useCategorySubmit = (id) => {
  const [imageUrl, setImageUrl] = useState('');
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    if (!imageUrl) {
      notifyError('Image is required!');
      return;
    }
    const categoryData = {
      name: getValues('name'),
      image: imageUrl,
    };

    if (id) {
      CategoryServices.updateCategory(id, categoryData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      CategoryServices.addCategory(categoryData)
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
      setValue('name');
      setImageUrl('');
      return;
    }
    if (id) {
      CategoryServices.getCategoryById(id)
        .then((res) => {
          if (res) {
            setValue('name', res?.name);
            setImageUrl(res?.image)
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
    imageUrl,
    setImageUrl,
  };
};

export default useCategorySubmit;
