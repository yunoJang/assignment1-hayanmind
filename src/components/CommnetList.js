import { useEffect, useState } from "react";
import axios from "axios";
import Comment from './Comment';

function CommnetList() { 
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isViewEnd, setIsViewEnd] = useState(false);
  
    useEffect(()=> {
        if (isViewEnd) {
            setPage(page=> page+1);
            setIsViewEnd(false);
        }
    },[isViewEnd])

    const onScroll = ()=> {
        const {scrollHeight,clientHeight,scrollTop} = document.documentElement;
        const degree =( scrollTop + clientHeight )/ scrollHeight;

        if (degree >= 1) {
            setIsViewEnd(true);
        }
    }

    useEffect(()=>{
      window.addEventListener('scroll', onScroll, {passive:true});

      return () => window.removeEventListener('scroll', onScroll, {passive:true});
    },[]);
  
    const loadComments = async page=> {
        const requestURL = `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=10`;
        
        setIsLoading(true);

        try {
            const {data : loadedComments} = await axios.get(requestURL);
            
            setComments(comments=> comments.concat(loadedComments));

            setIsLoading(false);
        }
        catch(err) {
            console.error(err)
        }
    }

    useEffect(()=>{
        loadComments(page)
    },[page])

    const renderComments = ()=> {
        return comments.map(comment=> 
            <Comment 
                key={comment.id} 
                id={comment.id} 
                email={comment.email}
                body={comment.body}
            />
        )
    }

    return (
        <ul className='commnet-list'>
            {renderComments()}
        </ul>
    )
}

export default CommnetList;