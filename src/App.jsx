import {useState} from 'react';
import './App.css';
import Create from './Components/Create';
import Update from './Components/Update';

function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}
function Header(props){
  return <header>
    <h1><a href="/" onClick={(event)=>{
      event.preventDefault();
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}
function Nav(props){
  const lis = []
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={event=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a>
    </li>)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}
function App() {
  const [mode, setMode] = useState('Main');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, title:'프론트', body:'안녕하세요 프론트입니다'},
    {id:2, title:'백', body:'안녕하세요 백입니다'},
    {id:3, title:'기획디자인', body:'안녕하세요 기디입니다'}
  ])
  let content = null;
  let contextControl = null; //상세보기에서만 수정하기 버튼 출력하기 위해 설정해줌

  if(mode === 'Main'){
    content = <Article title="멋쟁이사자처럼" body="안녕하세요 멋사입니다"></Article>
  } else if(mode === 'READ'){
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
    contextControl = <><li><a href={"/update/"+id} onClick={event=>{
      event.preventDefault();
      setMode('UPDATE');
    }}>Update</a></li>
    <li><input type="button" value="DELETE" onClick={()=>{
      const newTopics = []
      for(let i=0; i<topics.length; i++){
        if(topics[i].id !== id){
          newTopics.push(topics[i]);
        }
      }
      setTopics(newTopics);
      setMode('Main');
    }}/></li>
    </>
  } else if(mode === 'CREATE'){
    content = <Create onCreate={(title, body)=>{
      const newTopic = {id:nextId, title:title, body:body}
      const newTopics = [...topics] //topics의 복제본 만들어짐(상태 직접 변경 피함)
      newTopics.push(newTopic); //복제본(newTopics)에 사용자에게 입력받은 newTopic push해줌
      setTopics(newTopics); //복제본의 값을 setTopics하여 기존 Topics에 입력
      setMode('READ'); 
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  } else if(mode === 'UPDATE'){
    let title, body = null; //READ에서 복붙해오기
      for(let i=0; i<topics.length; i++){
        if(topics[i].id === id){
          title = topics[i].title;
          body = topics[i].body;
        }
      }
    content = <Update title={title} body={body} onUpdate={(title, body)=>{ //title, body값 => id를 통해 알아냄
      const updatedTopic = {id:id, title:title, body:body};
      const newTopics = [...topics];
      for(let i=0; i<newTopics.length; i++){
        if(newTopics[i].id === id){
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ');
    }}></Update>
  }
  return (
    <div className='main'>
      <Header title="멋쟁이사자처럼" onChangeMode={()=>{
        setMode('Main');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
      <ul>
      <li><a href="/create" onClick={event=>{ 
        event.preventDefault(); //a태그 실행 안되도록(링크 바뀌지 않게)
        setMode('CREATE'); //모드값을 Create로 바꿈 => App 컴포넌트 다시 실행
      }}>Create</a></li>
      {contextControl}
      </ul>
    </div>
  );
}
export default App;