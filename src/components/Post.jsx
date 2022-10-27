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

    //데이터 저장
    const [list, setList] = useState([])
    //페이지 저장
    const [page, setPage] = useState(0);
    //검색 키 저장
    const [key , setKey] =useState('')
    const [view, setInView] = useInView();
    //클릭 상태값 저장
    const [click, setClick]= useState(true)

    //get 요청 멈추기
    const [stop, setStop] =useState(1);

    //input 포커스 설정
    const InputRef = useRef(null);
    const FocusInputRef = () => {
        InputRef.current.focus();
    }

    //무한스크롤 get 요청
    const GetDataList = async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_SERVER + `?page=${page}&search=${key}`)
            setList([...list, ...res.data])
            setStop(res.data.length)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=> {
            GetDataList()
    },[page, key])


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
            <p onClick={()=> {FocusInputRef()}}><ImSearch/></p>
            <input
            ref={InputRef}
            placeholder='검색어를 입력하세요'
            onChange={(e)=> {
                setKey(e.target.value)
                setPage(0)
                setList([])
            }}  
            />
            </InputArea>
            <Choice click={click} setClick={setClick}/>
            <Containar>
                {
                    list?.map((a) => {
                        return (
                            <Card 
                                onClick={()=> {navigate(`${a.id}`)}}
                                key={a.id}>
                                <div>
                                    <p>{a.id}.</p>
                                    <p>{a.title}</p>
                                </div>
                                    {a.content}
                                <div ref={view}></div>
                            </Card>
                        )
                    })
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
        right: 10px;
        top : -15%;
        color: skyblue;
    }

    input {
        width: 20rem;
        height: 2rem;
        border-radius: 4px;
        border: 2px solid #eee
    }

    input:focus {
        outline: 1px solid skyblue;
    }
    input:hover {
        border: 2px solid skyblue;
    }
`

const Containar = styled.div`
    width: 53rem;
    height: 100%;
    border: 1px solid skyblue;
    border-radius: 12px;
    box-shadow: 0px 2px 8px rgba(17, 24, 39, 0.25);
    padding: 20px;
`

const Card = styled.div`
    width: 100%;
    height: 6.7rem;
    

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
        height: 40px;
        gap: 5px;
        font-weight: 500;
        P:first-child {
            color: skyblue;
        }
    }

`

export default Post;