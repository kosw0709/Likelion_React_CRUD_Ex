import React from 'react';

function Create(props){
    return <article>
        <h2>Create</h2>
        <form onSubmit={event=>{
            event.preventDefault(); //제출 버튼 클릭 시 페이지 리로드 되지 않게
            const title = event.target.title.value; //이벤트가 발생한 타겟을 가르킴(폼태그)
            const body = event.target.body.value;
            props.onCreate(title, body); //on create에 값 전달
        }}>
            <input type="text" name='title' placeholder='제목을 입력하세요'/> <br />
            <textarea name="body" placeholder='내용을 입력하세요' ></textarea> <br />
            <input type="submit" value="Create" />
        </form>
    </article>
}

export default Create;