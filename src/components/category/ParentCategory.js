import React from 'react';

import useAsync from '../../hooks/useAsync';
import CategoryServices from '../../services/CategoryServices';


const ParentCategory = () => {
  const { data } = useAsync(CategoryServices.getAllCategory); //   console.log(value);
  return (
    <>
      {data?.map((parent) => (
        <option key={parent.ten} value={parent.ten}>
          {parent.parent}
        </option>
      ))}
    </>
  );
};

export default ParentCategory;
