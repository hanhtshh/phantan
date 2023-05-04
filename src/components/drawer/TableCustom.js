import React, { useEffect, useState } from 'react';
import './Table.css';
import { IoAddCircleOutline } from 'react-icons/io5';

const TableCustom = ({ data, setSize }) => {
    const [newItem, setNewItem] = useState({ name: '', quantity: 0 });


    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newItems = [...data];
        newItems[index] = { ...newItems[index], [name]: value };
        setSize(newItems);
    };

    const handleAddItem = () => {
        setSize([...data, newItem]);
        setNewItem({ name: '', quantity: 0 });
    };

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Tên size</th>
                        <th>Số lượng</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <input type="text" name="name" value={item.name} onChange={(e) => handleChange(index, e)} className="table-input" />
                            </td>
                            <td>
                                <input type="number" name="quantity" value={item.quantity} onChange={(e) => handleChange(index, e)} className="table-input" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <div onClick={handleAddItem} className="add-button">
                    <IoAddCircleOutline />
                </div>
            </div>
        </div>
    );
};

export default TableCustom;
