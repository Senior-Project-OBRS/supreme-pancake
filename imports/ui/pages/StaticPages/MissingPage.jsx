import React from 'react';
import { Link } from 'react-router-dom';

export default Missing = () => {
    return (
        <article style={{ padding: "100px" }}>
            <h1>404 Error</h1>
            <p>Page Not Found</p>
            <div className='flexGrow'>
                {/* <Link to='/'>Go Back to Homepage</Link> */}
                <Link to='/'>กลับไปยังหน้าหลัก</Link>
            </div>
        </article>
    )
};