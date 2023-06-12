import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageHeader from '../../components/PageHeader';
import { onUpdateFormLoading, onLoading } from '../../actions';

const ManageUserPermission = (props) =>
{
    const [permissionValue, setPermissionValue] = useState({
        update_company: true,
        add_retailer: true,
        update_retailer: true,
        add_user: true,
        update_user: true
    });

    const history = useHistory()

    const [userId, setuserId] = useState('');

    useEffect(() => {
        let id = localStorage.getItem('idForUserPermission')
        if (id) {
            setuserId(id)
            getPermissionDetailForUpdate(id)
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onLoading(true)
        axios.post(`${process.env.REACT_APP_USER_SERVICE}/permission/update-permission`, {
            userid:userId,
            route_permission: permissionValue
        })
            .then(res =>
            {
                toast.success(res.data.message);
                props.onLoading(false)
            })
            .catch(e =>
            {
                toast.error(e.response.data.message); 
                props.onLoading(false)
        })
    }

    const onChangeHandler = (e) => {
        const value = e.target.value == 'true'
        const name = e.target.name

        setPermissionValue({ ...permissionValue, [name]: value })
    }


    const getPermissionDetailForUpdate = (id) =>
    {
        props.onUpdateFormLoading(true)
        axios.post(`${process.env.REACT_APP_USER_SERVICE}/permission/get-permission`,{userid:id})
            .then(res => {
                const data = res.data.permission
                setPermissionValue(data.route_permission)
                props.onUpdateFormLoading(false)
            })
            .catch(e => {
                console.log(e);
                props.onUpdateFormLoading(false)
            })
    }

    useEffect(() => () => {
        setuserId('')
        localStorage.removeItem("idForUserPermission")
    }, []);

    const processCancel = () => {
        setuserId('')
        localStorage.removeItem("idForUserPermission")
        history.push('/user')
    }

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
                        HeaderText="User Permission"
                        Breadcrumb={[
                            { name: "User List", navigate: "/user" },
                            { name: "User Permission", navigate: "" },
                        ]}
                    />
                    <div className='tab-component'>
                        <div className='card'>
                            <div className='body'>
                                {props.updateFormLoading ? <div className='loader-wrapper' >
                                    <i className="fa fa-refresh fa-spin"></i>
                                </div> : null}
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <Row>
                                            <Col md={2}>
                                                <label>Update Company</label>
                                            </Col>
                                            <Col>
                                                <label className="fancy-radio">
                                                    <input
                                                        data-parsley-errors-container="#error-radio"
                                                        name="update_company"
                                                        required=""
                                                        type="radio"
                                                        value={true}
                                                        checked={permissionValue.update_company}
                                                        onChange={onChangeHandler}
                                                    />
                                                    <span>
                                                        <i></i>Allow
                                                    </span>
                                                </label>
                                                <label className="fancy-radio">
                                                    <input
                                                        name="update_company"
                                                        type="radio"
                                                        value={false}
                                                        checked={!permissionValue.update_company}
                                                        onChange={onChangeHandler}
                                                    />
                                                    <span>
                                                        <i></i>Restrict
                                                    </span>
                                                </label>
                                            </Col>
                                        </Row>

                                    </div>
                                    <div className="form-group">
                                        <Row>
                                            <Col md={2}>
                                                <label>Add Retailer</label>
                                            </Col>
                                            <Col>
                                                <label className="fancy-radio">
                                                    <input
                                                        data-parsley-errors-container="#error-radio"
                                                        name="add_retailer"
                                                        required=""
                                                        type="radio"
                                                        value={true}
                                                        checked={permissionValue.add_retailer}
                                                        onChange={onChangeHandler}
                                                    />
                                                    <span>
                                                        <i></i>Allow
                                                    </span>
                                                </label>
                                                <label className="fancy-radio">
                                                    <input
                                                        name="add_retailer"
                                                        type="radio"
                                                        value={false}
                                                        checked={!permissionValue.add_retailer}
                                                        onChange={onChangeHandler}
                                                    />
                                                    <span>
                                                        <i></i>Restrict
                                                    </span>
                                                </label>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="form-group">
                                        <Row>
                                            <Col md={2}>
                                                <label>Update Retailer</label>
                                            </Col>
                                            <Col>
                                                <label className="fancy-radio">
                                                    <input
                                                        data-parsley-errors-container="#error-radio"
                                                        name="update_retailer"
                                                        required=""
                                                        type="radio"
                                                        value={true}
                                                        checked={permissionValue.update_retailer}
                                                        onChange={onChangeHandler}
                                                    />
                                                    <span>
                                                        <i></i>Allow
                                                    </span>
                                                </label>
                                                <label className="fancy-radio">
                                                    <input
                                                        name="update_retailer"
                                                        type="radio"
                                                        value={false}
                                                        checked={!permissionValue.update_retailer}
                                                        onChange={onChangeHandler}
                                                    />
                                                    <span>
                                                        <i></i>Restrict
                                                    </span>
                                                </label>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="form-group">
                                        <Row>
                                            <Col md={2}>
                                                <label>Add User</label>
                                            </Col>
                                            <Col>
                                                <label className="fancy-radio">
                                                    <input
                                                        data-parsley-errors-container="#error-radio"
                                                        name="add_user"
                                                        required=""
                                                        type="radio"
                                                        value={true}
                                                        checked={permissionValue.add_user}
                                                        onChange={onChangeHandler}
                                                    />
                                                    <span>
                                                        <i></i>Allow
                                                    </span>
                                                </label>
                                                <label className="fancy-radio">
                                                    <input
                                                        name="add_user"
                                                        type="radio"
                                                        value={false}
                                                        checked={!permissionValue.add_user}
                                                        onChange={onChangeHandler}
                                                    />
                                                    <span>
                                                        <i></i>Restrict
                                                    </span>
                                                </label>
                                            </Col>
                                        </Row>

                                    </div>
                                    <div className="form-group">
                                        <Row>
                                            <Col md={2}>
                                                <label>Update User</label>
                                            </Col>
                                            <Col>
                                                <label className="fancy-radio">
                                                    <input
                                                        data-parsley-errors-container="#error-radio"
                                                        name="update_user"
                                                        required=""
                                                        type="radio"
                                                        value={true}
                                                        checked={permissionValue.update_user}
                                                        onChange={onChangeHandler}
                                                    />
                                                    <span>
                                                        <i></i>Allow
                                                    </span>
                                                </label>
                                                <label className="fancy-radio">
                                                    <input
                                                        name="update_user"
                                                        type="radio"
                                                        value={false}
                                                        checked={!permissionValue.update_user}
                                                        onChange={onChangeHandler}
                                                    />
                                                    <span>
                                                        <i></i>Restrict
                                                    </span>
                                                </label>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className='row'>
                                        <div className='col-lg-12 col-md-12 col-12'>
                                            <div className='d-flex'>
                                                <button className="btn btn-primary w-auto btn-lg mr-2" type="submit" disabled={props.loading} >
                                                    {props.loading ? (<>
                                                        <Spinner animation="border" size="sm" /> Please wait...
                                                    </>) : 'Update'}
                                                </button>
                                                <button className="btn btn-secondary w-auto btn-lg" type="submit" onClick={processCancel} disabled={props.loading}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = ({ LoadingReducer }) => ({
    updateFormLoading: LoadingReducer.updateFormLoading,
    loading: LoadingReducer.isLoading,
});
export default connect(mapStateToProps, { onUpdateFormLoading, onLoading })(ManageUserPermission);
