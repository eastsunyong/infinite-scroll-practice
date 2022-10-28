import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import { useInView } from "react-intersection-observer";

//아이콘
import { ImSearch } from "react-icons/im"
import Choice from "./Choice";

const Post = () => {
    const navigate = useNavigate();

    //a-post 데이터 저장
    const [listOne, setListOne] = useState([])
    //b-post 데이터 저장
    const [listTwo, setListTwo] = useState([])
    //페이지 저장
    const [page, setPage] = useState(0);
    //검색 키 저장
    const [key, setKey] = useState('')
    //옵저버 설정
    const [view, setInView] = useInView();
    //클릭 상태값 저장
    const [click, setClick] = useState(true);

    //get 요청 멈추기
    const [stop, setStop] = useState(1);

    //input 포커스 설정
    const InputRef = useRef(null);
    const FocusInputRef = () => {
        InputRef.current.focus();
    }

    //무한스크롤 A-post get 요청
    const GetDataAPost = async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_SERVER + `?page=${page}&search=${key}`)
            setListOne([...listOne, ...res.data])
            setStop(res.data.length)
        } catch (err) {
            console.log(err)
        }
    }
    //무한스크롤 B-post get 요청
    const GetDataBPost = async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_SERVER2 + `?page=${page}&search=${key}`)
            setListTwo([...listTwo, ...res.data])
            setStop(res.data.length)
        } catch (err) {
            console.log(err)
        }
    }

    //선택한 버튼에 따라서 get 요청 보내기
    useEffect(() => {
        if (click) {
            GetDataAPost()
            return;
        }
        if (!click) {
            GetDataBPost()
            return;
        }
    }, [page, click, key])

    //스크롤 하단시 page+1 시키기
    useEffect(() => {
        if (stop === 0) {
            return;
        }
        if (setInView) {
            setPage(page + 1);
        }
    }, [setInView]);

    return (
        <>
            <InputArea>
                <p onClick={() => { FocusInputRef() }}><ImSearch /></p>
                <input
                    ref={InputRef}
                    placeholder='검색어를 입력하세요'
                    onChange={(e) => {
                        setKey(e.target.value)
                        setPage(0)
                        setListOne([])
                        setListTwo([])
                    }}
                />
            </InputArea>
            <Choice click={click} setClick={setClick} setPage={setPage} setListOne={setListOne} setListTwo={setListTwo} />
            <Containar>
                {
                    click ? <>
                        {
                            listOne?.map((a) => {
                                return (
                                    <Card
                                        onClick={() => { navigate(`aPost${a.id}`) }}
                                        key={a.id}>
                                        <div>
                                            <p>{a.id}.</p>
                                            <p>{a.title}</p>
                                        </div>
                                            <label>{a.content}</label>
                                        <div ref={view}></div>
                                    </Card>
                                )
                            })
                        } </> : <>
                        {
                            listTwo?.map((a) => {
                                return (
                                    <Card
                                        onClick={() => { navigate(`/bPost${a.id}`) }}
                                        key={a.id}>
                                        <div>
                                            <p>{a.id}.</p>
                                            <p>{a.title}</p>
                                        </div>
                                            <label>{a.content}</label>
                                        <div ref={view}></div>
                                    </Card>
                                )
                            })
                        }</>
                }

            </Containar>
        </>
    );
};

const InputArea = styled.div`
    position: relative;
    margin: 1rem 0;
    p{
        cursor: text;
        position: absolute;
        right: 1rem;
        top : -15%;
        color: skyblue;
    }

    input {
        width: 20rem;
        height: 2rem;
        border-radius: 0.5rem;
        border: 2px solid #eee;
        :focus{
        outline: 1px solid  skyblue;
        }
        :hover {
        border: 2px solid skyblue;
        }
    }
`

const Containar = styled.div`
    width: 53rem;
    height: 100%;
    border: 1px solid skyblue;
    border-radius: 1rem;
    box-shadow: 0px 2px 8px rgba(17, 24, 39, 0.25);
    padding: 1rem;
`

const Card = styled.div`
    width: 100%;
    height: 6.7rem;
    cursor: pointer;
    margin-bottom: 0.5rem;

    // 3줄 설정
    display: -webkit-box;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 3;

    :hover{
       background-color: rgba(0,0,0,0.1)
    }
    
    div {
        display: flex;
        height: 2.5rem;
        gap: 0.5rem;
        font-weight: 500;
        font-size: 1rem;

        p {
            margin-top: 8px;
            font-size: 20px;
        }
        
        P:first-child {
            color: skyblue;
        }
    }
        label {
            font-size: 16px;
            font-weight: 350;
        }

`

export default Post;