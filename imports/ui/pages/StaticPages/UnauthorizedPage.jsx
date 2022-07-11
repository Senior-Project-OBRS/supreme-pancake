import React from 'react';
import { useNavigate } from 'react-router-dom';

export default Unauthorized = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <section>
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            <div className='flexGrow'>
                <button onClick={() => goBack()}>
                    {/* Go Back */}
                    ย้อนกลับ
                </button>
            </div>
        </section>
    )
};