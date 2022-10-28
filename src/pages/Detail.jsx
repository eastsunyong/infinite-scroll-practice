import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from "axios";

const Detail = () => {
    const navigate = useNavigate();
    const [detailList, setDetailList] =useState([])
    const params = [useParams()]
    //타입 확인
    const type = params[0].id.slice(0,1)
    //아이디 확인
    const id = params[0].id.slice(5,9)

    const GetDataList = async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_DETAIL + `/${type}-posts/${id}`)
            setDetailList(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=> {
        GetDataList()
    },[])

    return (
        <Layout>
            <Box>
                <header><h2>{detailList.title}</h2></header>
                <div>{detailList.content}</div>
            </Box>
                <button onClick={()=> {navigate(-1)}}>뒤로가기</button>
        </Layout>
    );
};

const Layout = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    button {
        width: 8.5rem;
        height: 3rem;
        background-color: skyblue;
        border: none;
        border-radius: 1rem;
        color: white;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        :hover {
            background-color:rgba(59,130,246,0.5);
        }
    }
`

const Box = styled.div`
    width: 50%;
    border: 1px solid skyblue;
    border-radius: 1rem;
    margin-top: 5rem;
    margin-bottom: 2rem;
    padding: 2rem 4rem;
    box-shadow: 0px 2px 8px rgba(17, 24, 39, 0.25);
    
    header {
        text-align: center;
    }
    h2 {
        font-size: 2rem;
        margin-top: 0px;
    }
`

export default Detail;