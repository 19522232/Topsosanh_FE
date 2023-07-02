import { useEffect, useState } from "react";
import { get, post } from "../../ultils/AxiosClient";
import { SmileOutlined, FrownOutlined,DeleteOutlined } from "@ant-design/icons";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Image, Switch, Table, notification } from "antd";
import notificationService from "../../services/notificationService";

const columns = [
    {
        title: 'STT',
        dataIndex: 'index',
        key: 'index',
        filterMode: 'tree',
        filterSearch: true,
    },
    {
        title: 'Tên Sản Phẩm',
        dataIndex: 'name',
        key: 'name',
        filterMode: 'tree',
        filterSearch: true,
    },
    {
        title: 'Hình Ảnh',
        dataIndex: 'img',
        key: 'img',
    },
    {
        title: 'Giá mong muốn',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Thao Tác',
        dataIndex: 'action',
        key: 'action',
    },
];

function Tracking(props) {
    const [dataSource, setDataSource] = useState();
    const [reloadAPI, setReloadAPI] = useState();

    const openSuccessNotification = () => {
        notification.open({
            message: "Thao tác thực hiện thành công",
            duration: 10,
            icon: (
                <SmileOutlined
                    style={{
                        color: "green",
                    }}
                />
            ),
        });
    };

    useEffect(() => {
        getData()
    }, [reloadAPI])
    
    const openErrorNotification = (title) => {
        notification.open({
            message: title,
            duration: 2,
            icon: <FrownOutlined style={{ color: "red" }} />,
        });
    };

    const getData= async () => {
        const res = await get("notification/getall",{PageNumber:9999999999999999999});
        if (res.status == 200) {
            const temp = res.data.data.map((item, index) => {
                const defaultChecked=item.isActive 
                return {
                    index: index + 1,
                    name: item.productName,
                    img: <div style={{ width: '200px', height: '200px' }}><Image src={item.imageUrl}  ></Image></div>,
                    price: item.price,
                    action: <table>
                        <tr><td>Kích hoạt</td> <td><Switch checked={defaultChecked} onChange={() => { toggleActive(item.id) }} /></td></tr>
                        <tr><td>Tự động đặt hàng</td><td> <Switch checked={item.isAutoOrder } onChange={() => { toggleAutoOrder(item.id) }} /></td></tr>
                    </table>
                }
            })
            setDataSource(temp)
        }
    }

    const toggleActive = async (id) => {
        const res = await post("notification/ToggleNotification/" + id);
        if (res.status == 200) {
            openSuccessNotification();
            setReloadAPI(Math.random)
        } else if (res.status == 400) {
            res.data.errors.forEach(error => {
                openErrorNotification(error.toString())
              });
        }
        else  {
            openErrorNotification("Thao tác thất bại")
        }
    }

    const toggleAutoOrder = async (id) => {
        const res = await post("notification/ToggleAutoOrder/" + id);
        if (res.status == 200) {
            openSuccessNotification();
            setReloadAPI(Math.random)
        } else if (res.status == 400) {
            res.data.errors.forEach(error => {
                openErrorNotification(error.toString())
              });
        }
        else  {
            openErrorNotification("Thao tác thất bại")
        }
    }

    return <div>
         <Header></Header>
        <Table dataSource={dataSource} columns={columns} ></Table>
        <Footer></Footer>
    </div>
}

export default Tracking;
