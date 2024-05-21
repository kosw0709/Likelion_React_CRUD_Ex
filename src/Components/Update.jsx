import React from 'react';
import { useState } from 'react';

// Create.jsx 복붙해서 사용

function Update(props){
    const [title, setTitle] =  useState(props.title); {/*props=사용자가 컴포넌트에 전달한 명령(외부 -> 내부), state로 변경(내부 -> 내부)*/}
    const [body, setBody] = useState(props.body);
    return <article>
        <h2>Update</h2>
        <form onSubmit={event=>{
            event.preventDefault(); //제출 버튼 클릭 시 페이지 리로드 되지 않게
            const title = event.target.title.value; //이벤트가 발생한 타겟을 가르킴(폼태그)
            const body = event.target.body.value;
            props.onUpdate(title, body); //on Update에 값 전달
        }}>
            <input type="text" name='title' placeholder='제목을 입력하세요' value={title} onChange={event=>{ //리액트의 onChange => 값 입력할 떄마다 변경
                setTitle(event.target.value);
            }}/> <br /> 
            <textarea name="body" placeholder='내용을 입력하세요' value={body} onChange={event=>{
                setBody(event.target.value);
            }}></textarea> <br />
            <input type="submit" value="Update" />
        </form>
    </article>
}

export default Update;