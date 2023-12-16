import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Row, Col, Input, InputNumber, Upload, message, Select, Space, Table } from 'antd';
import { LoadingOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, PlusSquareOutlined, ArrowUpOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { PostProduct, PutProduct } from '../api/product-service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PostImage, GetImage, RemoveImage } from '../api/image-service';
import { GetProductByID } from '../api/product-service';
import { PostOrder } from '../api/book-product-service';
import { ConvertDate } from '../common/convertDateTimeShow';
const { TextArea } = Input;

const BookProductModal = ({ ResetTable, listProduct, listdataProduct, state, DataInfoOrder }) => {
    useEffect(() => {
        if (state === "SEEN") {
            setOpen(true)
            let res = []
            let data = DataInfoOrder.chiTietDdhs.map(x => {
                let item = listdataProduct.find(x1 => x1.id == x.maSp)
                if (item != null)
                    res.push({
                        key: item.id,
                        maSp: item.maSp,
                        tenSp: item.tenSp,
                        donGiaBan: item.donGiaBan,
                        soLuongCon: item.soLuong,
                        danhGia: item.danhGia,
                        soLuong: x.soLuong
                    })
            })
            SetDataTable(res)
            SetNameCustomer(DataInfoOrder.donDatHang.tenNguoiNhan)
            SetNote(DataInfoOrder.donDatHang.ghiChu)
        }
    }, [state])
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
            title: 'Số lượng còn',
            dataIndex: 'soLuongCon',
            width: '15%',
        },
        {
            title: 'Đánh giá',
            dataIndex: 'danhGia',
            width: '10%',
        },
        {
            title: 'Số lượng mua',
            dataIndex: 'soLuong',
            width: '15%',
            render: (_, record) => (
                (<InputNumber
                    value={record.soLuong} min={1} max={record.soLuongCon}
                    onChange={(value) => ChangeNumberBuy(record.key, value)}
                />))
        },
        {
            title: 'Tùy chọn',
            dataIndex: 'action',
            width: '15%',
            render: (_, record) => (
                (state !== "SEEN" && <Space size="middle">
                    <a onClick={() => RemoveProduct(record.key)}><DeleteOutlined /></a>
                </Space>)
            ),
        },
    ];

    const [totalPages, setTotalPages] = useState(10);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [DataTable, SetDataTable] = useState([])
    const [donDatHang, SetDonDatHang] = useState({

    })
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [fileProduct, SetFileProduct] = useState();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [listOrderDetails, SetListOrderDetails] = useState([]);
    const [CountMoney, SetCountMoney] = useState(0);
    const [nameCustomer, SetNameCustomer] = useState('');
    const [note, SetNote] = useState('');
    const showModal = () => {
        setOpen(true);
    };
    const RemoveProduct = (key) => {
        // Remove the product from DataTable
        const updatedDataTable = DataTable.filter(item => item.key !== key);
        SetDataTable(updatedDataTable);

        // Remove the product from ListOrderDetails
        const updatedListOrderDetails = listOrderDetails.filter(item => item.maSp !== key);
        SetListOrderDetails(updatedListOrderDetails);
        ChangeMoney(updatedListOrderDetails);
    }

    const handleOk = () => {
        const errors = {};

        if (nameCustomer === '') {
            errors.tenNguoiNhan = 'Tên khách hàng không được bỏ trống';
        }
        if (listOrderDetails.length == 0) {
            errors.sanpham = 'Chọn sản phẩm';
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setFormErrors({});
        PostOrder({
            donDatHang: {
                id: "n",
                thoiGianDat: null,
                trangThai: 0,
                tenNguoiNhan: nameCustomer,
                tongTien: CountMoney,
                maKhuyenMai: '1',
                ghiChu: note
            }, chiTietDdhs: listOrderDetails
        }).then(res => {
            ResetTable();
            ClearForm()
            toast.success("Hóa đơn lập cho khách hàng " + nameCustomer + " thành công")
        }).catch((e) => {
            toast.error(e);
        })


        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 1000);
    };
    const handleCancel = () => {
        setOpen(false);
        ClearForm();
        setFormErrors({});
        ResetTable()
    };

    const ClearForm = () => {
        SetCountMoney(0);
        SetNameCustomer('');
        SetNote('');
        SetDataTable([]);
        SetListOrderDetails([]);
    }
    const ChangeFilterTextNote = (e) => {
        SetNote(e.target.value)
    }
    const ChangeFilterTextName = (e) => {
        SetNameCustomer(e.target.value)
    }

    const ChangeNumberBuy = (id, value) => {
        const updatedList = listOrderDetails.map(item => {
            if (item.maSp === id) {
                return { ...item, soLuong: value };
            }
            return item;
        });

        // Update the listOrderDetails state with the modified list
        SetListOrderDetails(updatedList);

        // Update the DataTable state to reflect the changes in the table
        const updatedDataTable = DataTable.map(item => {
            if (item.key === id) {
                return { ...item, soLuong: value };
            }
            return item;
        });
        SetDataTable(updatedDataTable);
        ChangeMoney(updatedList);
    }
    const handleChangeSelect = (value) => {
        let data = []
        listdataProduct.forEach(item => {
            if (value.includes(item.id)) {
                data.push({
                    key: item.id,
                    maSp: item.maSp,
                    tenSp: item.tenSp,
                    donGiaBan: item.donGiaBan,
                    soLuongCon: item.soLuong,
                    danhGia: item.danhGia,
                    soLuong: 1
                })
            }
        })
        SetDataTable(data)
        const list = data.map(item => {
            return {
                maDdh: "string",
                maSp: item.key,
                soLuong: item.soLuong,
                giaTien: item.donGiaBan,
            }
        })
        SetListOrderDetails(list);
        ChangeMoney(list);

    };
    const ChangeMoney = (data) => {
        let money = 0;
        data.forEach(item => {
            money += item.giaTien * item.soLuong
        })
        SetCountMoney(money)
    }
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Thêm
            </Button>
            <Modal
                title="Lập hóa đơn"
                width={800}
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={state === "SEEN" ? [
                    <Button key="cancel" onClick={handleCancel}>Đóng</Button>
                ] : [
                    <Button key="cancel" onClick={handleCancel}>Hủy</Button>,
                    <Button key="ok" type="primary" onClick={handleOk} loading={confirmLoading}>
                        OK
                    </Button>,
                ]}
            >
                <Form
                    style={{ width: '100%', backgroundColor: '#fff', paddingTop: '20px', paddingLeft: '10px', borderRadius: '8px' }}
                >
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Tên khách hàng" validateStatus={formErrors.tenNguoiNhan ? 'error' : ''} help={formErrors.tenNguoiNhan}>
                                <Input
                                    value={nameCustomer} onChange={ChangeFilterTextName}
                                    name='maSp' disabled={state === "SEEN" ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>
                    {state !== "SEEN" && <Row>
                        <Col span={24}>
                            <Form.Item label="Chọn sản phẩm" validateStatus={formErrors.sanpham ? 'error' : ''} help={formErrors.sanpham}>
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Please select"
                                    onChange={handleChangeSelect}
                                    options={listProduct}
                                />
                            </Form.Item>
                        </Col>

                    </Row>}
                    {state === "SEEN" &&
                        <Row>
                            <Col span={24}>
                                <Form.Item label="Ngày đặt" >
                                    <Input
                                        value={ConvertDate(DataInfoOrder.donDatHang.thoiGianDat)}
                                        disabled />
                                </Form.Item>
                            </Col>

                        </Row>}
                    <div style={{ marginTop: "16px" }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Danh sách sản phẩm</h3>
                        </div>
                        <Table rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
                            columns={columns} dataSource={DataTable}
                        // pagination={{
                        //     pageSize: 6,
                        //     total: totalPages,
                        //     onChange: (page) => {
                        //         //fetchRecords(page);
                        //     },
                        // }} 
                        />
                    </div>
                    <Row style={{ padding: ' 8px 0' }}>
                        <Col span={20}></Col>
                        <Col span={4}>
                            <b >Tổng tiền: {CountMoney} </b>

                        </Col>
                    </Row>
                    <Row>
                        <Form.Item label="Ghi chú">
                            <TextArea style={{ width: '690px', }} value={note} onChange={ChangeFilterTextNote}
                                name='ghiChu' rows={4} disabled={state === "SEEN" ? true : false} />
                        </Form.Item>
                    </Row>
                </Form>
            </Modal >
            <ToastContainer />
        </>
    );
};
export default BookProductModal;

