import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Pagination from 'react-responsive-pagination';
import axios from 'axios';
import { onLoading } from "../../actions"
import { connect } from 'react-redux';
import PageHeader from '../../components/PageHeader';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom"
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import './retailerList.css'
import Select from 'react-select';
import { useCompanyList } from '../../Hooks/useCompanyList'

const RetailerList = (props) => {

    const [retailerList, setRetailerList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(2);
    const [dataLimit, setdataLimit] = useState(5);
    const history = useHistory()
    const [searchCompanyId, setSearchCompanyId] = useState('');

    const companyList = useCompanyList(props.user.data.role)

    useEffect(() => {
        getDataFromApi()
    }, [currentPage, dataLimit]);

    const getDataFromApi = () => {
        props.onLoading(true)
        axios.get(`${process.env.REACT_APP_API_URL}/retailer/get-retailer-list?page=${currentPage}&limit=${dataLimit}`)
            .then(res => {
                let totlePage = Math.ceil(res.data.totlaRecord / res.data.limit)
                setTotalPages(totlePage)
                setRetailerList(res.data.retailers)
                props.onLoading(false)
            })
            .catch(e => {
                setRetailerList([])
                props.onLoading(false)
            })
    }

    const updateCompanyHandler = (id) => {
        localStorage.setItem("newlyAddedRetailer", id)
        history.push('/manage-retailer')
    }

    const filterChangeHandler = (value) => {
        console.log(value);
    }

    const activateDeactivate = (event, id) => {
        const status = event.target.checked
        Swal.fire({
            title: `${status ? 'Activate' : 'Deactivate'} Retailer?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, ${status ? 'Activate' : 'Deactivate'} it!`
        }).then((result) => {
            if (result.isConfirmed) {
                props.onLoading(true)
                axios.post(`${process.env.REACT_APP_API_URL}/retailer/retailer-status/${id}`, { status })
                    .then(res => {
                        toast.success(res.data.message)
                        getDataFromApi();
                        props.onLoading(false)
                    }).catch(e => {
                        toast.error("Something Went Wrong")
                        getDataFromApi();
                        props.onLoading(false)
                    })
            }
        })
    }

    let filterList = [
        { label: "All", value: "ALL" },
        { label: "Activate", value: "ACTIVATE" },
        { label: "Deactivate", value: "DEACTIVATE" },
    ]

    return (
        <div
            style={{ flex: 1 }}
            onClick={() => {
                document.body.classList.remove("offcanvas-active");
            }}
        >
            <div>

                <div className="container-fluid">
                    <PageHeader
                        HeaderText="Retailer List"
                        Breadcrumb={[
                            { name: "Manage", navigate: "" },
                            { name: "Retailer List", navigate: "" },
                        ]}
                    />
                    <div className='tab-component'>
                        <div className='card'>
                            <div className='body'>
                                <div className='d-flex justify-content-between align-items-center mb-3'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div className='mr-2' style={{ minWidth: "110px" }}>
                                            <Select
                                                options={filterList}
                                                placeholder="All"
                                                onChange={filterChangeHandler}
                                            />
                                        </div>
                                        {/* <div style={{ width: "300px" }}>
                                            <Select
                                                options={companyList.map(data => {
                                                    return {
                                                        value: data._id,
                                                        label: data.name
                                                    }
                                                })}
                                                placeholder="Select Company"
                                                onChange={() => {

                                                }}
                                            /><Button>Search</Button>
                                        </div> */}
                                    </div>
                                    {props.user.permissions.add_retailer ? (<Link className='link-btn' to={`/manage-retailer`} >
                                        Add Retailer
                                    </Link>) : null}
                                </div>
                                <div className='data-table'>
                                    {props.loading ? <div className='loader-wrapper' >
                                        <i className="fa fa-refresh fa-spin"></i>
                                    </div> : null}
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Retailer Code</th>
                                                <th>Logo</th>
                                                <th>Retailer Name</th>
                                                <th>Last Update</th>
                                                {props.user.permissions.update_retailer ? (
                                                    <>
                                                        <th>Activate / Deactivate</th>
                                                        <th>Action</th>
                                                    </>
                                                ) : null}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {retailerList.map((data) => {
                                                return (<tr key={data._id}>
                                                    <td>{data.retailer_code}</td>
                                                    <td>
                                                        {data.logo?.contentType ?
                                                            (<div className='list-logo'><img src={`${process.env.REACT_APP_API_URL}/retailer/retailer-logo/${data._id}`} /></div>) :
                                                            (<div className='list-logo placeholder'>N/A</div>)}
                                                    </td>
                                                    <td>{data.name}</td>
                                                    <td>{data.updated_on ? moment(data.updated_on).format("MM/DD/YYYY hh:mm a") : 'N/A'}</td>
                                                    {props.user.permissions.update_retailer ? (
                                                        <>
                                                            <td><Form.Check
                                                                type="switch"
                                                                id={`${data._id}`}
                                                                checked={data.status}
                                                                onChange={(e) => activateDeactivate(e, data._id)}
                                                            /></td>
                                                            <td className='action-group'>
                                                                <i data-placement="top" title="Edit" className="fa fa-edit edit" onClick={() => updateCompanyHandler(data._id)}></i>
                                                            </td>
                                                        </>
                                                    ) : null}


                                                </tr>)
                                            })}

                                        </tbody>
                                    </table>
                                    <div className='pagination-wrapper'>
                                        <Pagination
                                            current={currentPage}
                                            total={totalPages}
                                            onPageChange={setCurrentPage}
                                        />
                                        <select name="companyOwner" className="form-control" onChange={(e) => {
                                            setCurrentPage(1)
                                            setdataLimit(e.target.value)
                                        }}>
                                            <option value={5}>5</option>
                                            <option value={10}>10</option>
                                            <option value={20}>20</option>
                                            <option value={50}>50</option>
                                            <option value={100}>100</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = ({ LoadingReducer, loginReducer }) => ({
    loading: LoadingReducer.isLoading,
    user: loginReducer.user
});
export default connect(mapStateToProps, { onLoading })(RetailerList);
