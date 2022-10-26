import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import styled from 'styled-components';
import axios from 'axios'

import Search from "./Search";

const Post = () => {
    const [list, setList] = useState([])
    const [page, setPage] = useState(0);
    const [view, setInView] = useInView();

    const navigate = useNavigate();

    const GetDataList = async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_SERVER + `?page=${page}`)
            setList([...list, ...res.data])
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        GetDataList()
    }, [page])

    useEffect(() => {
        if (setInView && list?.length !== 0) {
          setPage(page + 1);
        }
      }, [setInView]);

    return (
        <>
        <Search page={page} setPage={setPage} list={list} setList={setList} />
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

const Containar = styled.div`
    width: 55rem;
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