import { useState} from "react";
import styled from 'styled-components';

const Choice = () => {
const [test, setTest]= useState(true)

    return (
        <ButtonArea>
            <button
            className={test ? "cliked" : ""}
            onClick={()=> {setTest(true)}}>A posts</button>

            <button
            className={test ? "" : "cliked"}
            onClick={()=> {setTest(false)}}>B posts</button>
        </ButtonArea>
    );
};

const ButtonArea = styled.div`
    width: 55rem;
    border-bottom: 1px solid skyblue;
    margin-bottom: 1rem;
    button {
        width: 4rem;
        height: 2rem;
        background-color: white;
        border: none;
        cursor: pointer;
        :hover{
          background-color: rgba(0,0,0,0.1);
          color: skyblue;
        }
        :focus{
            color: skyblue;
        }
    }
    .cliked {
        color: skyblue;
    }
`

export default Choice;