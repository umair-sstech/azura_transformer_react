import React from 'react';
import PageHeader from '../../components/PageHeader';

const Profile = (props) =>
{
   return (
        <>
        <div
        style={{ flex: 1 }}
        onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}
      >
        <div>
          <div className="container-fluid">
            <PageHeader
              HeaderText="Manage Profile"
              Breadcrumb={[
                { name: "Integration", navigate: "#" },
                { name: "Manage Profile", navigate: "#" },
              ]}
              style={{ position: "sticky", top: 0, zIndex: 999 }}
            />
            <div className="tab-component">
              <div className="card">
                <div className="body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                  </div>
  
                  <div className="data-table">
                    {props.loading ? (
                      <div className="loader-wrapper">
                        <i className="fa fa-refresh fa-spin"></i>
                      </div>
                    ) : null}
                    <table className="table w-100 table-responsive-sm">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Logo</th>
                          <th>Name</th>
                          <th>Last Update(UTC)</th>
                            <th>Action</th>
                         
                        </tr>
                      </thead>
                      <tbody>
                       
                          <tr>
                            <td>1</td>
                            <td>
                            <div className="list-logo placeholder">N/A</div>
                            </td>
                            <td>Azura Fashion</td>
  
                            <td>Time Zone</td>
                           
                            <>
                              
                              <td className="action-group">
                                <i
                                  data-placement="top"
                                  title="Edit"
                                  className="fa fa-edit edit"
                                 
                                ></i>
                              </td>
                            </>
                          </tr>
                       
                      </tbody>
                    </table>
               
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </>
    );
}

export default Profile;
