import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import styled from 'styled-components';
import { ImSearch } from "react-icons/im"

const Search = ({page, setList, setPage}) => {

    const [key , setKey] =useState('')
    //input 포커스 설정
    const InputRef = useRef(null);
    const FocusInputRef = () => {
        InputRef.current.focus();
    }

    
    const SerchList = async () => {
        try{
            const res = await axios.get(process.env.REACT_APP_SERVER + `?page=${page}&search=${key}`)
            setList(res.data)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(()=> {
        SerchList()
    },[key])


    return (
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

export default Search;