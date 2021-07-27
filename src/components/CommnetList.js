import { useEffect, useState } from "react";
import axios from "axios";

import Comment from './Comment';

function CommnetList() { 
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState([]);

    const loadComments = async ()=> {
        try {
            const {data : loadedComments} = await axios.get(`https://jsonplaceholder.typicode.com/comments?_page=1&_limit=10`);

            setComments(comments=> {
                const newComments = Array.from(comments);
                newComments.push(...loadedComments);

                return newComments;
            });
            setIsLoading(false);    
        }
        catch(err) {
            console.log(err)
        }
    }

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

    useEffect(()=>{loadComments()},[])

    return (
            <ul className='commnet-list'>
              {renderComments()}
              {isLoading ? <div>Loading...</div> : ''}
            </ul>
    )
}

export default CommnetList;