import React, { useEffect, useState } from 'react';
import { Space, Button, Table, Input, Form, Row, Col, Select, Modal, DatePicker } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusSquareOutlined, ArrowUpOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { GetAllProduct, GetListBrand, GetListTypeProduct, RemoveProductbyID, GetProductByID } from '../api/product-service';

// import EmployeeModelComponent from '../model-info-employee/model-info-employee';
// import { GetView_DepartmentList, GetView_PositionList, GetView_ProjectList, GetView_SkillList } from '../../api/listViewAPI';
// import {
//     GetEmployeeViews, DeleteEmployee, DeleteMultipleEmployees, UpdateSalary,
//     UpdateProjectEmployee, GetEmployeeByID, GetEmployeeOBJ
// } from '../../api/EmployeeAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductModal from './product-modal';
const { Column } = Table;
const { Search } = Input;




const Product = () => {

    const columns = [
        {
            title: 'Mã sản phẩm',
            dataIndex: 'maSp',
            width: '10%',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'tenSp',
            width: '20%',
        },
        {
            title: 'Đơn giá bán',
            dataIndex: 'donGiaBan',
            width: '10%',
        },
        {
            title: 'Đơn giá nhập',
            dataIndex: 'donGiaNhap',
            width: '15%',
        },
        {
            title: 'Số lượng',
            dataIndex: 'soLuong',
            width: '15%',
        },
        {
            title: 'Đánh giá',
            dataIndex: 'danhGia',
            width: '10%',
        },
        {
            title: 'Tùy chọn',
            dataIndex: 'action',
            width: '15%',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => ShowInfoProduct(record.key)}>
                        <EyeOutlined /></a>
                    <a onClick={() => ShowFormEdit(record.key)}><EditOutlined /></a>
                    <a onClick={() => RemoveProduct(record.key, record.maSp)}><DeleteOutlined /></a>
                    <a><ArrowUpOutlined /></a>
                    <a><PlusSquareOutlined /></a>
                </Space>
            ),
        },
    ];
    const ShowInfoProduct = (id) => {
        // GetEmployeeOBJ(id).then(res => {
        //     console.log(res.data)
        //     SetDataInfoEmployee(res.data)
        //     SetIsShowInfo(true)
        // })
    }
    // const HideInfoEmployee = () => {
    //     SetIsShowInfo(false)
    // }
    const [modal, contextHolder] = Modal.useModal();
    const [isShowInfo, SetIsShowInfo] = useState(false)
    const [DataInfoEmployee, SetDataInfoEmployee] = useState({})
    const [totalPages, setTotalPages] = useState(10);
    const [DataTable, SetDataTable] = useState([])
    const [isRender, SetIsRender] = useState(true);
    const [resetData, SetResetData] = useState(true)
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listBrand, SetListBrand] = useState([])
    const [listTypeProduct, SetListTypeProct] = useState([])
    const [currentID, SetCurrentID] = useState('')
    const [dataEdit, SetDataEdit] = useState({})
    // const ChangeDataupdateSalary = (e) => {
    //     console.log(e)
    //     SetDataUpdateSalary((dataUpdateSalary) => ({
    //         ...dataUpdateSalary,
    //         [e.target.name]: e.target.value,
    //     }));
    // }
    // const ChangeDataupdateSalaryDate = (date, dateString) => {
    //     SetDataUpdateSalary((dataUpdateSalary) => ({
    //         ...dataUpdateSalary,
    //         startDate: date,
    //     }));
    // };
    // const ChangeDataupdateProjectDate = (date, dateString) => {
    //     SetDataUpdateProject((dataUpdateProject) => ({
    //         ...dataUpdateProject,
    //         startDate: date,
    //     }));
    // };
    const [dataSearch, SetDataSearch] = useState({
        maSP: '',
        loai: '',
        thuongHieu: ''
    })
    useEffect(() => {
        if (resetData) {
            GetListBrand().then(res => {
                let data = res.data.map(item => { return { value: item.id, label: item.tenThuongHieu } })
                SetListBrand(data);
            }).catch(ex => { console.log(ex) })

            GetListTypeProduct().then(res => {
                let data = res.data.map(item => { return { value: item.id, label: item.tenPhanLoai } })
                SetListTypeProct(data);
            }).catch(ex => { console.log(ex) })

            SetResetData(false)
        }

    }, [resetData])
    useEffect(() => {
        if (isRender) {
            GetAllProduct(dataSearch.maSP, dataSearch.loai, dataSearch.thuongHieu).then(res => {
                let dataShow = res.data.map(item => {
                    return {
                        key: item.id,
                        maSp: item.maSp,
                        tenSp: item.tenSp,
                        donGiaBan: item.donGiaBan,
                        donGiaNhap: item.donGiaNhap,
                        soLuong: item.soLuong,
                        danhGia: item.danhGia,
                    }
                })
                SetDataTable(dataShow)
                SetIsRender(false)
            }).catch(e => {
                console.log(e)
            })
        }
    }, [isRender])

    const ChangeFilterText = (e) => {
        SetDataSearch((dataSearch) => ({
            ...dataSearch,
            [e.target.name]: e.target.value,
        }));

    }
    const Filter = () => {
        SetIsRender(true)
    }
    const ClearFilter = () => {
        SetDataSearch({
            maSP: '',
            loai: '',
            thuongHieu: '',
        })
        SetIsRender(true)
    }
    // useEffect(() => {
    //     fetchRecords(1);
    // }, []);
    // const fetchRecords = (pageNum) => {
    //     SetDataSearch({
    //         ...dataSearch,
    //         pageNum: pageNum
    //     });
    //     SetIsRender(true)
    // }
    // const showInfoDelete = () => {
    //     confirmDeleteMulti();
    // }

    //
    const notify = (message) => {
        toast.success(message + ' thành công!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
    const RemoveProduct = (id, name) => {
        modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: 'Xác nhận muốn xóa sản phẩm mã ' + name,
            okText: 'Xóa',
            onOk() {
                RemoveProductbyID(id).then(res => {
                    SetIsRender(true);
                    notify("Xóa sản phẩm " + res.data.maSp)
                }).catch(e => {
                    console.log(e)
                })
            },
            cancelText: 'Quay lại',
        });

    }
    // modal








    const [isShowModalEmployee, SetIsShowModalEmployee] = useState(false)
    const showADDModal = () => {
        SetIsShowModalEmployee(true)
    }
    const hideADDModal = () => {
        SetIsShowModalEmployee(false)
    }

    const ShowFormEdit = (id) => {
        SetCurrentID(id)
        GetProductByID(id).then(res => {
            let data = res.data;
            SetDataEdit(data)
        }).catch(e => {
            console.log(e)
        })
    }
    const ResetTable = () => {
        SetIsRender(true)
    }
    // const groupAndMergeSkills = (input) => {
    //     const result = {};

    //     input.forEach(employee => {
    //         const id = employee.ID;
    //         if (!result[id]) {
    //             result[id] = {
    //                 ...employee,
    //                 skillList: [employee.SkillID]
    //             };
    //         } else {
    //             result[id].skillList.push(employee.SkillID);
    //         }
    //     });

    //     return Object.values(result);
    // }
    const handleTypeProduct = (value) => {
        SetDataSearch((dataSearch) => ({
            ...dataSearch,
            loai: value
        }));
    }
    const handleBrand = (value) => {
        SetDataSearch((dataSearch) => ({
            ...dataSearch,
            thuongHieu: value
        }));
    }
    return (
        <div style={{ padding: 10 }}>
            <div>
                <Form
                    style={{ width: '100%', backgroundColor: '#fff', paddingTop: '20px', paddingLeft: '10px', borderRadius: '8px' }}
                >
                    <Row>
                        <Col span={5}>
                            <Form.Item label="Mã sản phẩm">
                                <Input
                                    value={dataSearch.maSP} onChange={ChangeFilterText}
                                    name='maSP' />
                            </Form.Item>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={5}>
                            <Form.Item label="Loại">
                                <Select

                                    onChange={(value) => handleTypeProduct(value)}
                                    options={listTypeProduct}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={5}>
                            <Form.Item label="Thương hiệu">
                                <Select

                                    onChange={(value) => handleBrand(value)}
                                    options={listBrand}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={5} style={
                            { display: 'flex', flexDirection: 'row-reverse' }
                        }>

                            <Button style={{ marginRight: 10 }}
                                onClick={ClearFilter}
                            >Làm mới </Button>
                            <Button type="primary" style={{ marginRight: 10 }}
                                onClick={Filter}
                            > Lọc </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div style={{ marginTop: "16px" }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3>Danh sách sản phẩm</h3>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <ProductModal ResetTable={ResetTable} listBrand={listBrand}
                            listTypeProduct={listTypeProduct} dataEdit={dataEdit}></ProductModal>
                        {contextHolder}
                    </div>
                </div>
                <Table rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
                    columns={columns} dataSource={DataTable}
                    pagination={{
                        pageSize: 6,
                        total: totalPages,
                        onChange: (page) => {
                            //fetchRecords(page);
                        },
                    }} />
            </div>
            <ToastContainer />


        </div>

    );
};

export default Product;
