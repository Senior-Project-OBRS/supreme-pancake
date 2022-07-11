import React from 'react';

import Backdrop from './Backdrop';
import Modal from './Modal';

import { isObjectNotEmpty } from '../../../../../../utils/objectUtils';

let chargeData;

export default MessageDetails = ({ charge, closeModal }) => {
    if (isObjectNotEmpty(charge)) chargeData = charge;

    return (
        <React.Fragment>
            {(!chargeData || !chargeData.amount) && <p>Oops...something went wrong!!</p>}
            {chargeData && chargeData.amount && (
                <div>
                    <Backdrop />
                    <Modal charge={chargeData} closeModal={closeModal} />
                </div>
            )}
        </React.Fragment>
    );
};