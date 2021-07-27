import CommentList from './components/CommnetList';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const onScroll = ()=> {
    const totalHeight = document.documentElement.scrollHeight;
    const degree = window.scrollY / (totalHeight - window.innerHeight);

    if (degree === 1) {
      setPage(page=> page+1);
    }
  }

  useEffect(()=>{
    window.addEventListener('scroll', onScroll, {passive:true});
  },[])

  return (
    <div className="App">
      <CommentList page={page} setIsLoading={setIsLoading}/>
      {/* {isLoading ? <div>Loading...</div> : ''} */}
    </div>
  );
}

export default App;
