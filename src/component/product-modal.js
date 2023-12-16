import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Row, Col, Input, InputNumber, Upload, message, Select } from 'antd';
import { LoadingOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, PlusSquareOutlined, ArrowUpOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { PostProduct, PutProduct } from '../api/product-service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PostImage, GetImage, RemoveImage } from '../api/image-service';
const { TextArea } = Input;
const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};
const ProductModal = ({ ResetTable, listTypeProduct, listBrand, dataEdit }) => {
    const [formErrors, setFormErrors] = useState({});
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
    const [state, SetState] = useState("ADD")
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [fileProduct, SetFileProduct] = useState();
    const handleChange = (info) => {
        SetFileProduct(info.file.originFileObj);
        SetDataModal((dataModal) => ({
            ...dataModal,
            anh: info.file.name,
        }));
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [imgOld, SetImageOld] = useState('')
    const showModal = () => {
        setOpen(true);
    };
    const handleTypeProduct = (value) => {
        SetDataModal((dataModal) => ({
            ...dataModal,
            maLoai: value
        }));
    }
    const handleBrand = (value) => {
        SetDataModal((dataModal) => ({
            ...dataModal,
            maThuongHieu: value
        }));
    }
    const handleOk = () => {
        const errors = {};

        if (!dataModal.maSp) {
            errors.maSp = 'Mã sản phẩm không được bỏ trống';
        }
        if (!dataModal.tenSp) {
            errors.tenSp = 'Tên sản phẩm không được bỏ trống';
        }
        if (!dataModal.maLoai) {
            errors.maLoai = 'Phân loại không được bỏ trống';
        }
        if (!dataModal.maThuongHieu) {
            errors.maThuongHieu = 'Thương hiệu không được bỏ trống';
        }
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        setFormErrors({});
        if (state === "ADD") {
            PostProduct(dataModal).then(res => {
                PostImage(fileProduct).then(res => {
                    console.log(res)
                })
                ResetTable();
                ClearForm()
                toast("Thêm sản phẩm " + res.data.maSp)
            }).catch((e) => {
                toast.error(e);
            })
        }

        if (state === "EDIT") {
            PutProduct(dataModal).then(res => {
                if (imgOld != fileProduct.name) {
                    RemoveImage(imgOld).then(res => {
                        console.log(res)
                    })
                    PostImage(fileProduct).then(res => {
                        console.log(res)
                    })
                }

                ResetTable();
                ClearForm()
                toast("Cập nhật sản phẩm " + res.data.maSp)
            }).catch((e) => {
                console.log(e)
                toast.error(e.response.data);
            })
        }
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
    };
    const [dataModal, SetDataModal] = useState({
        id: "n",
        maSp: "",
        tenSp: "",
        donGiaBan: 0,
        donGiaNhap: 0,
        maLoai: "",
        soLuong: null,
        maThuongHieu: "",
        anh: "",
        moTa: ""
    })
    const ClearForm = () => {
        SetDataModal({
            id: "n",
            maSp: "",
            tenSp: "",
            donGiaBan: 0,
            donGiaNhap: 0,
            maLoai: "",
            soLuong: null,
            maThuongHieu: "",
            anh: "",
            moTa: ""
        })
        SetFileProduct(null);
        setImageUrl(null)
    }
    const ChangeFilterText = (e) => {
        SetDataModal((dataModal) => ({
            ...dataModal,
            [e.target.name]: e.target.value,
        }));
    }
    const ChangeFilterTextNumber = (value, name) => {

        SetDataModal((dataModal) => ({
            ...dataModal,
            [name]: value,
        }));
    }
    useEffect(() => {
        if (Object.keys(dataEdit).length > 0) {
            setOpen(true)
            SetState("EDIT")
            SetDataModal({ ...dataEdit })
            GetImage(dataEdit.anh).then(res => {
                SetImageOld(dataEdit.anh)
                const blob = new Blob([res.data], { type: 'image/jpeg' });
                const file = new File([blob], dataEdit.anh);
                SetFileProduct(file);
                getBase64(file, (url) => {
                    setLoading(false);
                    setImageUrl(url);
                });
            })

        }

    }, [dataEdit])
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Thêm
            </Button>
            <Modal
                title="Thêm sản phẩm"
                width={800}
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Form
                    style={{ width: '100%', backgroundColor: '#fff', paddingTop: '20px', paddingLeft: '10px', borderRadius: '8px' }}
                >
                    <Row>
                        <Col span={11}>
                            <Form.Item label="Mã sản phẩm" validateStatus={formErrors.maSp ? 'error' : ''} help={formErrors.maSp}>
                                <Input
                                    value={dataModal.maSp} onChange={ChangeFilterText}
                                    name='maSp' />
                            </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                            <Form.Item label="Tên sản phẩm" validateStatus={formErrors.tenSp ? 'error' : ''} help={formErrors.tenSp}>
                                <Input
                                    value={dataModal.tenSp} onChange={ChangeFilterText}
                                    name='tenSp' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <Form.Item label="Đơn giá nhập">
                                <InputNumber min={0} max={100000000} defaultValue={0} style={{ width: "100%" }}
                                    value={dataModal.donGiaNhap} onChange={(value) => ChangeFilterTextNumber(value, "donGiaNhap")}
                                    name='donGiaNhap' />
                            </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                            <Form.Item label="Đơn giá bán">
                                <InputNumber min={0} max={100000000} defaultValue={0} style={{ width: "100%" }}
                                    value={dataModal.donGiaBan} onChange={(value) => ChangeFilterTextNumber(value, "donGiaBan")}
                                    name='donGiaBan' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <Form.Item label="Thương hiệu" validateStatus={formErrors.maThuongHieu ? 'error' : ''} help={formErrors.maThuongHieu}>
                                <Select
                                    value={dataModal.maThuongHieu}
                                    onChange={(value) => handleBrand(value)}
                                    options={listBrand}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                            <Form.Item label="Loại" validateStatus={formErrors.maLoai ? 'error' : ''} help={formErrors.maLoai}>
                                <Select
                                    value={dataModal.maLoai}
                                    onChange={(value) => handleTypeProduct(value)}
                                    options={listTypeProduct}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <Form.Item label="Số lượng">
                                <InputNumber min={0} max={10000} defaultValue={0} style={{ width: "100%" }}
                                    value={dataModal.soLuong} onChange={(value) => ChangeFilterTextNumber(value, "soLuong")}
                                    name='soLuong' />
                            </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                            <Form.Item label="Ảnh">
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                >
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt="avatar"
                                            style={{
                                                width: '100%',
                                            }}
                                        />
                                    ) : (
                                        uploadButton
                                    )}
                                </Upload>


                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Item label="Mô tả">
                            <TextArea style={{ width: '690px', }} value={dataModal.moTa} onChange={ChangeFilterText}
                                name='moTa' rows={4} />
                        </Form.Item>
                    </Row>
                </Form>
            </Modal >
            <ToastContainer />
        </>
    );
};
export default ProductModal;