import './Comment.css';

function Comment({id,email,body}) {
    return (
        <li className='comment'>
            <h1><span className='title'>Comment Id</span><span>{id}</span></h1>

            <div className='email'><span className='title'>Email</span><span>{email}</span></div>
            
            <div className='content'>
                <span className='title'>Comment</span>
                <span>{body}</span>
            </div>
        </li>
    )
}

export default Comment;