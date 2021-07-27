import { useEffect, useState } from "react";
import axios from "axios";
import Comment from './Comment';

function CommnetList() { 
    const [comments, setComments] = useState([]);
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
  

    const loadComments = async page=> {
        setIsLoading(true);

        try {
            const {data : loadedComments} = await axios.get(`https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=10`);

            setComments(comments=> {
                const newComments = Array.from(comments);
                newComments.push(...loadedComments);

                return newComments;
            });
            
            setIsLoading(false);
        }
        catch(err) {
            console.error(err)
        }
    }

    useEffect(()=>{loadComments(page)},[page])

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
            {isLoading ? <div>Loading...</div> : ''}
        </ul>
    )
}

export default CommnetList;