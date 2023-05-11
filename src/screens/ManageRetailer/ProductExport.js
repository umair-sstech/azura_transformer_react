import React, { useState } from 'react';
import "../ManageRetailer/Retailer.css"


function ProductExport() {
  const [data, setData] = useState([
    { id: 1, name: 'Product 1', price: 100, selected: false },
    { id: 2, name: 'Product 2', price: 200, selected: false },
    { id: 3, name: 'Product 3', price: 300, selected: false },
  ]);

  const handleSelect = (id) => {
    setData(data.map((item) => {
      if (item.id === id) {
        return { ...item, selected: !item.selected };
      }
      return item;
    }));
  };

  const handleSelectAll = (e) => {
    setData(data.map((item) => {
      return { ...item, selected: e.target.checked };
    }));
  };

  return (
    <>
      <form>
        <div className='row'>
          <table className='product-table table w-100'>
            <thead>
              <tr>
                <th>
                  <input
                    type='checkbox'
                    checked={data.every((item) => item.selected)}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>id</th>
                <th>Supplier Name</th>
                <th>Category</th>
                <th>Product Count</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input
                      type='checkbox'
                      checked={item.selected}
                      onChange={() => handleSelect(item.id)}
                    />
                  </td>
                  <td>1</td>
                  <td>UP Feed</td>
                  <td>Accessories</td>
                  <td>20</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </>
  );
}

export default ProductExport;
