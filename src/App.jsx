import React, {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Avatar, Image, Input, Layout, message, Select, Space, Spin, Table, Tag} from 'antd';

function App() {
    // const props = window.MyReactProps || {};
    const params = new URLSearchParams(window.location.search);
    const apiUrl = params.get("apiUrl");
    const message = params.get("message");
    const [count, setCount] = useState(0);
    const [products, setProducts] = useState([]);

    const columns = [
        {
            title: 'Image',
            dataIndex: 'images',
            key: 'image',
            render: (_, {images}) => (
                <>
                    <Avatar.Group
                        size="large"
                    >
                        {images.map((item, index) => {
                            return (
                                <Avatar src={item.url}/>
                            )
                        })}

                    </Avatar.Group>
                </>
            )
        },
        {
            title: 'Title',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand'
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render:(text) => <Tag color={'#A0EDA8'} style={{ color: 'black' }}>{text}</Tag>
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity'
        }
    ];

    const mapProducts = (products) => {
        const data = products;
        console.log(data);
        const mapProducts = data.map((item, index) => {
            return {
                key:item._id,
                name: item.name,
                brand: item.brand,
                price: item.price,
                category: item.gender,
                quantity: item.variants.reduce((acc, item) => (acc + item.stock), 0),
                images: item.variants.reduce((acc, item) => {
                    item.images.forEach((item) => acc.push(item));
                    return acc;
                }, [])
            }
        });
        console.log('1111', mapProducts);
        setProducts([...mapProducts]);

    }

    useEffect(()=>{
        fetch(apiUrl).then((e) => {
            return e.json();

        }).then(async (e)=>{
            console.log(e);
            await mapProducts(e);

        }).catch((e) => {
            console.log(e);
        })

    },[count]);

    return (
        <>
            <h1>{message}</h1>
            <button onClick={() => setCount((prev) => prev + 1)}>click</button>
            <Table columns={columns} dataSource={products}  pagination={{
                pageSize: 5
            }}/>

        </>

    )
}

export default App
