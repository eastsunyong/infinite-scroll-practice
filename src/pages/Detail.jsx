import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from "axios";

const Detail = () => {
    const navigate = useNavigate();
    const [detailList, setDetailList] =useState([])
    const {id} = useParams();

    const GetDataList = async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_SERVER + `/${id}`)
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
            <div>
                <button onClick={()=> {navigate(-1)}}>돌아가기</button>
            </div>
        </Layout>
    );
};

const Layout = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    div:last-child {
        display: flex;
    }
`

const Box = styled.div`
    width: 60%;
    height: 250px;
    border: 1px solid skyblue;
    border-radius: 8px;
    margin-top: 5rem;
    padding: 1rem 4rem;
    box-shadow: 0px 2px 8px rgba(17, 24, 39, 0.25);
    
    header {
        text-align: center;
    }
`

export default Detail;