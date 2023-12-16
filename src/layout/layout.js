import React, { useState, useEffect } from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, } from 'antd';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { HomeOutlined, ProjectOutlined, UnorderedListOutlined, LogoutOutlined } from '@ant-design/icons';
// import ModelInfoproduct from '../component/model-info-product/model-info-product';
import { Avatar, Space } from 'antd';
import './style.scss';
import Product from '../component/product';
import BookProduct from '../component/book-product';
// import bookComponent from '../component/book/book-component';
// import HomeComponent from '../component/home/home-component';
// import productComponent from '../component/product-component/product-component';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import productbookComponent from '../component/productInbook/product-book';
const { Header, Content, Footer, Sider } = Layout;

const LayoutCommon = () => {
    const navigate = useNavigate()
    const [currentKeyNav, SetCurrentKeyNav] = useState('');
    const [textHeader, SetTextHeader] = useState('')
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    useEffect(() => {
        const link = window.location.href.split('/');
        const key = link[link.length - 1]
        switch (key) {
            case '':
                SetTextHeader("Trang chủ");
                break;
            case 'product':
                SetTextHeader("Quản lý sản phẩm");
                break;
            case 'book':
                SetTextHeader("Hóa đơn bán");
                break;
        }
    }, [window])
    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    // console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    // console.log(collapsed, type);
                }}
            >
                <div className="demo-logo-vertical" />
                <Menu
                    onClick={({ key }) => {
                        navigate(key)
                        SetCurrentKeyNav(key)
                        switch (key) {
                            case '/':
                                SetTextHeader("Trang chủ");
                                break;
                            case '/product':
                                SetTextHeader("Quản lý sản phẩm");
                                break;
                            case '/book':
                                SetTextHeader("Lập hóa đơn");
                                break;
                        }
                    }}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[currentKeyNav]}
                    items=
                    {[
                        { label: "Trang chủ", icon: <HomeOutlined />, key: "/" },
                        {
                            label: "Quản lý sản phẩm",
                            icon: <UnorderedListOutlined />,
                            key: "/product"
                        },
                        { label: "Lập hóa đơn", icon: <ProjectOutlined />, key: "/book" },
                        { label: "Đăng xuất", icon: <LogoutOutlined />, key: "/logout" }
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >

                    <div className='text-header'>{textHeader}</div>
                    <Space direction="vertical" size={16}>
                        <Space wrap size={16}>
                            <Avatar src="https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045-2.jpg" size="large" icon={<UserOutlined />} />
                        </Space>

                    </Space>
                </Header>
                <Content style={{ backgroundColor: 'rgb(246 248 255)' }}>
                    <ContentShow ></ContentShow>

                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©2023 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};
function ContentShow() {
    // const notify = () => {
    //     toast.success('success!', {
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

    return <div >
        <Routes>
            <Route path='/' element={<h1>a</h1>}></Route>
            <Route path='/product' element={<Product></Product>}></Route>
            <Route path='/book' element={<BookProduct></BookProduct>}></Route>
            <Route path='/logout' element={<h1></h1>}></Route>
        </Routes>
    </div>
}
export default LayoutCommon;