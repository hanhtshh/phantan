import Cookies from 'js-cookie';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import AdminServices from '../services/AdminServices';
import { notifyError, notifySuccess } from '../utils/toast';

const useLoginSubmit = () => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AdminContext);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ name, username, password }) => {
    setLoading(true);

    if (name) {
      AdminServices.registerAdmin({ name, username, password })
        .then((res) => {
          if (res) {
            console.log(res);
            setLoading(false);
            notifySuccess('Register Success!');
            // dispatch({ type: 'USER_LOGIN', payload: res });
            // Cookies.set('adminInfo', JSON.stringify(res));
            // history.replace('/');
          }
        })
        .catch((err) => {
          notifyError(err ? err.response.data.message : err.message);
          setLoading(false);
        });
    } else {
      AdminServices.loginAdmin({ userName: username, passWord: password })
        .then((res) => {
          if (res) {
            console.log(res);
            if (res?.maNv) {
              setLoading(false);
              notifySuccess('Đăng nhập thành công!');
              // dispatch({ type: 'USER_LOGIN', payload: res });
              Cookies.set('adminInfo', JSON.stringify({
                name: "Nguyễn Văn Hạnh",
                address: "Thái Sơn, Hiệp Hòa, Bắc Giang",
                telephone: "0966835110",
                email: "hanh1452001@gmail.com",
                admin: 0,
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDcyODJmZmNkMjJlOWQzOWUwMTA0YzgiLCJpYXQiOjE2OTk4ODUwMTIsImV4cCI6MTcwMDQ4OTgxMn0.v8ABg2NZ_6mkMlM2n_yo0nkE5VEgW9HK31DkKB8uNac"
              }));
              localStorage.setItem('maNv', res.maNv)
              history.push('/customers-list');
            }
            else {
              notifyError('Thông tin đăng nhập không đúng!')
            }
          }
        })
        .catch((err) => {
          notifyError(err ? err.response.data.message : err.message);
          setLoading(false);
        });
    }
  };
  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    loading,
  };
};

export default useLoginSubmit;
