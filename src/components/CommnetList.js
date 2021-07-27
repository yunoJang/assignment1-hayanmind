import { useEffect, useState } from "react";
import axios from "axios";

import Comment from './Comment';

function CommnetList({page}) { 
    const [comments, setComments] = useState([]);

    const loadComments = async page=> {
        //setIsLoading(true);

        try {
            const {data : loadedComments} = await axios.get(`https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=10`);

            setComments(comments=> {
                const newComments = Array.from(comments);
                newComments.push(...loadedComments);

                return newComments;
            });
            
            //setIsLoading(false);
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

    useEffect(()=>{loadComments(page)},[page])

    return (
        <ul className='commnet-list'>
            {renderComments()}
        </ul>
    )
}

export default CommnetList;