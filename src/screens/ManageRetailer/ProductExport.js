import React, { useState } from 'react';
import "../ManageRetailer/Retailer.css"
import { Spinner } from 'react-bootstrap';


function ProductExport() {
  const [data, setData] = useState([
    { id: 1, name: 'UP Feed', count: 10,category:"Accessories > Belt  > Bel"},
    { id: 1, name: 'UP Feed', count: 20,category:"Accessories > Belt  > Bel"},
    { id: 1, name: 'UP Feed', count: 30,category:"Accessories > Belt  > Bel"},
    { id: 2, name: 'Test Supplier', count: 10,category:"Accessories > Belt  > Bel"},
    { id: 2, name: 'Test Supplier', count: 20,category:"Accessories > Belt  > Bel"},
    { id: 2, name: 'Test Supplier', count: 30,category:"Accessories > Belt  > Bel"},
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExit, setIsLoadingExit] = useState(false);

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
      <div className="row">
      <div className="col-lg-12 col-md-12 col-12 button-class">
        <div className="d-flex">
          <button
            className="btn btn-primary w-auto btn-lg mr-2"
            type="submit"
          >
            {isLoading ? (
              <>
                <Spinner animation="border" size="sm" /> Please wait...
              </>
            ) : (
              "Save & Next"
            )}
          </button>

          <button
            className="btn btn-primary w-auto btn-lg mr-2"
            type="submit"
          >
            {isLoadingExit ? (
              <>
                <Spinner animation="border" size="sm" /> Please wait...
              </>
            ) : (
              "Save & Exit"
            )}
          </button>
          <button className="btn btn-secondary w-auto btn-lg" type="button">
            Exit
          </button>
        </div>
      </div>
    </div>
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
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.count}</td>

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
