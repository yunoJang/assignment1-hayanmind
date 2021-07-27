function Comment({id,email,body}) {
    return (
        <li className='comment'>
            <h1><span>Comment Id</span> <span>{id}</span></h1>

            <div className='email'><span>Email</span><span>{email}</span></div>
            
            <div className='content'>
                <span>Comment</span>
                <span>{body}</span>
            </div>
        </li>
    )
}

export default Comment;