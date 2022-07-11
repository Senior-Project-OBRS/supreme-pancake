import React from 'react';

import TICKET_status from '../../../../../utils/enums/status/TICKET_status';

export default Ticket = ({ ticket, onCheckboxClick }) => {
    return (
        <React.Fragment>
            <p disabled={ticket.status === TICKET_status.post_checkin}>
                <span>
                    {ticket.titleName}{ticket.firstName} {ticket.lastName}
                </span>&emsp;&emsp;
                
                <input 
                    type="checkbox"
                    onClick={() => onCheckboxClick(ticket)}
                    readOnly
                />
            </p>     
        </React.Fragment>
    );
};