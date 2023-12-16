import React, { useEffect, useState } from 'react';
import { Space, Button, Table, Input, Form, Row, Col, Select, Modal, DatePicker } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusSquareOutlined, ArrowUpOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
// import EmployeeModelComponent from '../model-info-employee/model-info-employee';
// import { GetView_DepartmentList, GetView_PositionList, GetView_ProjectList, GetView_SkillList } from '../../api/listViewAPI';
// import {
//     GetEmployeeViews, DeleteEmployee, DeleteMultipleEmployees, UpdateSalary,
//     UpdateProjectEmployee, GetEmployeeByID, GetEmployeeOBJ
// } from '../../api/EmployeeAPI';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
const { Column } = Table;
const { Search } = Input;




const BookRoom = () => {
    const columns = [
        {
            title: 'Mã nhân viên',
            dataIndex: 'Employeecode',
            width: '10%',
        },
        {
            title: 'Họ tên',
            dataIndex: 'Name',
            width: '20%',
        },
        {
            title: 'phòng',
            dataIndex: 'Department',
            width: '10%',
        },
        {
            title: 'vị trí',
            dataIndex: 'Position',
            width: '15%',
        },
        {
            title: 'dự án hiện tại',
            dataIndex: 'Project',
            width: '15%',
        },
        {
            title: 'mức lương ',
            dataIndex: 'Salary',
            width: '10%',
        },
        {
            title: 'Tùy chọn',
            dataIndex: 'action',
            width: '15%',
            // render: (_, record) => (
            //     <Space size="middle">
            //         <a onClick={() => ShowInfoEmployee(record.key)}>
            //             <EyeOutlined /></a>
            //         <a onClick={() => ShowFormEdit(record.key)}><EditOutlined /></a>
            //         <a onClick={() => RemoveEmployee(record.key, record.Name)}><DeleteOutlined /></a>
            //         <a onClick={() => showModalSalary(record.key, record.Salary, record.Name)}><ArrowUpOutlined /></a>
            //         <a onClick={() => showModalProject(record.key, record.Project, record.Name)}><PlusSquareOutlined /></a>
            //     </Space>
            // ),
        },
    ];
    // const ShowInfoEmployee = (id) => {
    //     GetEmployeeOBJ(id).then(res => {
    //         console.log(res.data)
    //         SetDataInfoEmployee(res.data)
    //         SetIsShowInfo(true)
    //     })
    // }
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
    const [listDataDepartment, SetListDataDepartment] = useState([])
    const [listDataPosition, SetListDataPosition] = useState([])
    const [listDataSkill, SetListDataSkill] = useState([])
    const [listDataProject, SetListDataProject] = useState([])
    const [currentID, SetCurrentID] = useState('')
    const [salaryCurrent, SetSalaryCurrent] = useState('')
    const [nameEmployeeCurrent, SetNameEmployeeCurrent] = useState('')
    const [projectCurrent, SetProjectCurrent] = useState('')
    const [dataUpdateProject, SetDataUpdateProject] = useState({ employeeId: '', projectId: '', startDate: '' })
    const [dataUpdateSalary, SetDataUpdateSalary] = useState({ employeeId: '', salaryAmount: '', startDate: '' })
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
    // const [dataSearch, SetDataSearch] = useState({
    //     nameSearch: '',
    //     departmentID: '',
    //     positionID: '',
    //     projectID: '',
    //     skillID: '',
    //     pageNum: 1,
    //     pageSize: 5
    // })
    // useEffect(() => {
    //     if (resetData) {
    //         GetView_DepartmentList().then(res => {
    //             let data = res.data.map(item => { return { value: item.ID, label: item.Name } })
    //             SetListDataDepartment(data)
    //         }).catch(e => {
    //             console.log(e)
    //         })
    //         GetView_PositionList().then(res => {
    //             let data = res.data.map(item => { return { value: item.ID, label: item.Name } })
    //             SetListDataPosition(data)
    //         }).catch(e => {
    //             console.log(e)
    //         })
    //         GetView_SkillList().then(res => {
    //             let data = res.data.map(item => { return { value: item.ID, label: item.Name } })
    //             SetListDataSkill(data)
    //         }).catch(e => {
    //             console.log(e)
    //         })
    //         GetView_ProjectList().then(res => {
    //             let data = res.data.map(item => { return { value: item.ID, label: item.Name } })
    //             SetListDataProject(data)
    //         }).catch(e => {
    //             console.log(e)
    //         })
    //         SetResetData(false)
    //     }

    // }, [resetData])
    // useEffect(() => {
    //     if (isRender) {
    //         GetEmployeeViews(dataSearch).then(res => {
    //             let dataShow = res.data.map(item => {
    //                 return {
    //                     key: item.Id,
    //                     Employeecode: item.Employeecode,
    //                     Department: item.Department,
    //                     Name: item.Name,
    //                     Position: item.Position,
    //                     Project: item.Project,
    //                     Salary: item.Salary,
    //                 }
    //             })
    //             SetDataTable(dataShow)
    //             SetIsRender(false)
    //         }).catch(e => {
    //             console.log(e)
    //         })
    //     }
    // }, [isRender])
    // const handleChangeSearchDepartment = (value) => {
    //     SetDataSearch({
    //         ...dataSearch,
    //         departmentID: value
    //     });
    // }
    // const handleChangeSearchPosition = (value) => {
    //     SetDataSearch({
    //         ...dataSearch,
    //         positionID: value
    //     });
    // }
    // const handleChangeSearchProject = (value) => {
    //     SetDataSearch({
    //         ...dataSearch,
    //         projectID: value
    //     });
    // }
    // const handleChangeSearchSkill = (value) => {
    //     SetDataSearch({
    //         ...dataSearch,
    //         skillID: value
    //     });
    // }
    // const ChangeFilterText = (e) => {
    //     SetDataSearch((dataSearch) => ({
    //         ...dataSearch,
    //         [e.target.name]: e.target.value,
    //     }));

    // }
    // const Filter = () => {
    //     SetIsRender(true)
    // }
    // const ClearFilter = () => {
    //     SetDataSearch({
    //         nameSearch: '',
    //         departmentID: '',
    //         positionID: '',
    //         projectID: '',
    //         skillID: '',
    //         pageNum: 1,
    //         pageSize: 5
    //     })
    //     SetIsRender(true)
    // }
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
    // const notify = (message) => {
    //     toast.success(message + ' thành công!', {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "colored",
    //     });
    // }
    // const RemoveEmployee = (id, name) => {
    //     modal.confirm({
    //         title: 'Confirm',
    //         icon: <ExclamationCircleOutlined />,
    //         content: 'Xác nhận muốn xóa nhân viên ' + name,
    //         okText: 'Xóa',
    //         onOk() {
    //             DeleteEmployee(id).then(res => {
    //                 SetIsRender(true);
    //                 notify("Xóa nhân viên")
    //             }).catch(e => {
    //                 console.log(e)
    //             })
    //         },
    //         cancelText: 'Quay lại',
    //     });

    // }
    // modal
    const [isModalOpenSalary, setIsModalOpenSalary] = useState(false);

    // const showModalSalary = (id, salary, name) => {
    //     SetNameEmployeeCurrent(name)
    //     SetSalaryCurrent(salary)
    //     setIsModalOpenSalary(true);
    //     SetDataUpdateSalary((dataUpdateSalary) => ({
    //         ...dataUpdateSalary, employeeId: id
    //     }))

    // };

    // const handleOkSalary = () => {
    //     setIsModalOpenSalary(false);
    //     console.log(dataUpdateSalary)
    //     UpdateSalary(dataUpdateSalary).then(res => {
    //         notify("Cập nhật mức lương ")
    //         SetIsRender(true)
    //         SetDataUpdateSalary({ employeeId: '', projectId: '', startDate: '' })
    //     }).catch(e => {
    //         console.log(e)
    //     })
    // };

    // const handleCancelSalary = () => {
    //     setIsModalOpenSalary(false);
    // };
    const [isModalOpenProject, setIsModalOpenProject] = useState(false);

    // const showModalProject = (id, name, nameEmployee) => {
    //     SetNameEmployeeCurrent(nameEmployee)
    //     SetProjectCurrent(name)
    //     setIsModalOpenProject(true);
    //     SetDataUpdateProject((dataUpdateProject) => ({
    //         ...dataUpdateProject, employeeId: id
    //     }))
    // };
    // const handleChangeDataProject = (value) => {
    //     SetDataUpdateProject({
    //         ...dataUpdateProject,
    //         projectId: value
    //     });
    // }

    // const handleOkProject = () => {
    //     setIsModalOpenProject(false);
    //     console.log(dataUpdateProject)
    //     UpdateProjectEmployee(dataUpdateProject).then(res => {
    //         SetIsRender(true)
    //         notify("Them vao du an ")
    //         SetDataUpdateProject({ employeeId: '', salaryAmount: '', startDate: '' })
    //     }).catch(e => {
    //         console.log(e)
    //     })
    // };

    // const handleCancelProject = () => {
    //     setIsModalOpenProject(false);
    // };

    // const confirmDeleteMulti = () => {
    //     modal.confirm({
    //         title: 'Confirm',
    //         icon: <ExclamationCircleOutlined />,
    //         content: 'Xác nhận muốn xóa ?',
    //         okText: 'Xóa',
    //         onOk() {
    //             DeleteMultipleEmployees(selectedRowKeys).then(res => {
    //                 SetIsRender(true)
    //                 notify("Xóa nhân viên")
    //             }).catch(e => {
    //                 console.log(e)
    //             })
    //         },
    //         cancelText: 'Quay lại',
    //     });
    // };
    const [isShowModalEmployee, SetIsShowModalEmployee] = useState(false)
    // const showADDModal = () => {
    //     SetIsShowModalEmployee(true)
    // }
    // const hideADDModal = () => {
    //     SetIsShowModalEmployee(false)
    // }
    // const [dataEdit, SetDataEdit] = useState({})
    // const ShowFormEdit = (id) => {
    //     SetIsShowModalEmployee(true)
    //     GetEmployeeByID(id).then(res => {
    //         let data = res.data;
    //         SetDataEdit(groupAndMergeSkills(data))
    //     }).catch(e => {
    //         console.log(e)
    //     })
    // }
    // const ResetTable = () => {
    //     SetIsRender(true)
    // }
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
    return (
        <div style={{ padding: 10 }}>
            <div>
                <Form
                    style={{ width: '100%', backgroundColor: '#fff', paddingTop: '20px', paddingLeft: '10px', borderRadius: '8px' }}
                >
                    <Row>
                        <Col span={5}>
                            <Form.Item label="Tên khách hàng">
                                <Input style={{
                                    width: 200,
                                }}
                                    // value={dataSearch.nameSearch} onChange={ChangeFilterText} 
                                    name='nameSearch' />
                            </Form.Item>
                        </Col>
                        <Col span={3}></Col>
                        <Col span={5}>
                            <Form.Item label="Số CCCD">
                                <Input style={{
                                    width: 200,
                                }}
                                    // value={dataSearch.nameSearch} onChange={ChangeFilterText} 
                                    name='nameSearch' />
                            </Form.Item>
                        </Col>
                        <Col span={6}></Col>
                        <Col span={5} style={
                            { display: 'flex', flexDirection: 'row-reverse' }
                        }>

                            <Button style={{ marginRight: 10 }}
                            //  onClick={ClearFilter}
                            >Làm mới </Button>
                            <Button type="primary" style={{ marginRight: 10 }}
                            //  onClick={Filter}
                            > Lọc </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div style={{ marginTop: "16px" }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3>Danh sách khách hàng</h3>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button type="primary"
                            // onClick={showADDModal} 
                            style={{ marginRight: 6 }}>
                            Thêm
                        </Button>
                        {/* <EmployeeModelComponent
                            ResetTable={ResetTable}
                            dataEdit={dataEdit}
                            OnHide={hideADDModal}
                            isShow={isShowModalEmployee}
                            listDataDepartment={listDataDepartment}
                            listDataPosition={listDataPosition}
                            listDataSkill={listDataSkill}
                            listDataProject={listDataProject} ></EmployeeModelComponent> */}

                        <Button danger
                        // onClick={showInfoDelete}
                        >Xóa </Button>
                        {contextHolder}
                    </div>
                </div>
                <Table rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
                    columns={columns} dataSource={DataTable}
                    pagination={{
                        pageSize: 5,
                        total: totalPages,
                        onChange: (page) => {
                            //fetchRecords(page);
                        },
                    }} />
            </div>
            {/* <ToastContainer /> */}


        </div>

    );
};

export default BookRoom;
