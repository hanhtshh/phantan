import * as dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isToday from 'dayjs/plugin/isToday';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

//internal import
import ProductServices from '../services/ProductServices';
import { notifyError, notifySuccess } from '../utils/toast';

export const calcDate = (dateString) => {

  const dateParts = dateString.split("/");

  // month is 0-based, that's why we need dataParts[1] - 1
  const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  return dateObject
}

const useFilter = (data) => {
  const [filter, setFilter] = useState('');
  const [sortedField, setSortedField] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const [searchCoupon, setSearchCoupon] = useState('');
  const [searchOrder, setSearchOrder] = useState('');
  const [categoryType, setCategoryType] = useState('');
  const [pending, setPending] = useState([]);
  const [processing, setProcessing] = useState([]);
  const [delivered, setDelivered] = useState([]);
  const [status, setStatus] = useState('');
  const [role, setRole] = useState('');
  const [time, setTime] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dataTable, setDataTable] = useState([]); //tableTable for showing on table according to filtering
  const [todayOrder, setTodayOrder] = useState('');
  const [monthlyOrder, setMonthlyOrder] = useState('');
  const [totalOrder, setTotalOrder] = useState('');
  const [newProducts] = useState([]);
  const searchRef = useRef('');
  const userRef = useRef('');
  const couponRef = useRef('');
  const orderRef = useRef('');
  const categoryRef = useRef('');
  dayjs.extend(isBetween);
  dayjs.extend(isToday);
  const location = useLocation();

  //service data filtering
  const serviceData = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() - time);
    let services = data;

    if (location.pathname === '/dashboard' && services?.length > 0) {

      const orderPending = services.filter(
        (statusP) => statusP?.status === 'Pending'
      );
      setPending(orderPending);

      const orderProcessing = services.filter(
        (statusO) => statusO?.status === 'Processing'
      );
      setProcessing(orderProcessing);

      const orderDelivered = services.filter(
        (statusD) => statusD?.status === 'Delivered'
      );
      setDelivered(orderDelivered);

      //daily total order calculation
      const todayServices = []
      console.log(todayServices)
      const todayOrder = todayServices.reduce(
        (preValue, currentValue) => preValue + currentValue.cost,
        0
      );
      setTodayOrder(todayOrder);

      //monthly order calculation
      const monthlyServices = []

      const monthlyOrder = monthlyServices.reduce(
        (preValue, currentValue) => preValue + currentValue.cost,
        0
      );
      setMonthlyOrder(monthlyOrder);

      // //total order calculation
      const totalOrder = services.reduce(
        (preValue, currentValue) => preValue + currentValue.cost,
        0
      );
      setTotalOrder(totalOrder);
    }

    //products filtering

    if (filter) {
      services = services.filter((order) => order?.customer?.telephone?.includes(filter));
    }

    if (sortedField === 'Low') {
      services = services.sort((a, b) => a.price < b.price && -1);
    }
    if (sortedField === 'High') {
      services = services.sort((a, b) => a.price > b.price && -1);
    }
    if (searchText) {
      services = services.filter((search) =>
        search?.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    //category searching
    if (categoryType) {
      console.log("OKKKKK",categoryType);
      services = services.filter((search) =>
        search?.ten?.toLowerCase().includes(categoryType.toLowerCase()) || search?.tenPhim?.toLowerCase().includes(categoryType.toLowerCase())
      );
    }

    //User and Admin filtering
    if (searchUser) {
      services = services.filter(
        (search) =>
          search.name.toLowerCase().includes(searchUser.toLowerCase()) ||
          search?.phone?.toLowerCase().includes(searchUser.toLowerCase()) ||
          search?.email?.toLowerCase().includes(searchUser.toLowerCase())
      );
    }


    // order filtering
    if (status) {
      services = services.filter((order) => order.status === status);
    }
    if (searchOrder) {
      services = services.filter((search) =>
        search.contact.toLowerCase().includes(searchOrder.toLowerCase())
      );
    }

    return services;
  }, [
    filter,
    sortedField,
    data,
    searchText,
    searchUser,
    searchOrder,
    status,
    location,
    categoryType
  ]);

  //pagination functionality start

  const resultsPerPage = 8;
  const totalResults = serviceData.length;

  const handleChangePage = (p) => {
    setCurrentPage(p);
  };

  useEffect(() => {
    setDataTable(
      serviceData.slice(
        (currentPage - 1) * resultsPerPage,
        currentPage * resultsPerPage
      )
    );
  }, [serviceData, currentPage, resultsPerPage]);

  //pagination functionality end

  //table form submit function for search start

  const handleSubmitForAll = (e) => {
    e.preventDefault();
    console.log("fsdfds")
    setSearchText(searchRef.current.value);
  };

  const handleSubmitUser = (e) => {
    e.preventDefault();
    setSearchUser(userRef.current.value);
  };

  const handleSubmitCoupon = (e) => {
    e.preventDefault();
    setSearchCoupon(couponRef.current.value);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setSearchOrder(orderRef.current.value);
  };

  const handleSubmitCategory = (e) => {
    e.preventDefault();
    console.log(categoryRef.current.value)
    setCategoryType(categoryRef.current.value);
  };

  //table form submit function for search end

  //handle submit multiple product data with csv format

  const handleOnDrop = (data) => {
    for (let i = 0; i < data.length; i++) {
      newProducts.push(data[i].data);
    }
  };

  const handleUploadProducts = () => {
    if (newProducts.length < 1) {
      notifyError('Please upload/select csv file first!');
    } else {
      ProductServices.addAllProducts(newProducts)
        .then((res) => {
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
    }
  };

  return {
    userRef,
    searchRef,
    couponRef,
    orderRef,
    categoryRef,
    pending,
    processing,
    delivered,
    todayOrder,
    monthlyOrder,
    totalOrder,
    setFilter,
    setSortedField,
    setStatus,
    setRole,
    setTime,
    handleChangePage,
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    handleSubmitUser,
    handleSubmitForAll,
    handleSubmitCoupon,
    handleSubmitOrder,
    handleSubmitCategory,
    handleOnDrop,
    handleUploadProducts,
  };
};

export default useFilter;
