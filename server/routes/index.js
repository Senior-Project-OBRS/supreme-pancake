import { Picker } from 'meteor/meteorhacks:picker';
import bodyParser from 'body-parser';

import CHECKOUT_url from '../../imports/utils/enums/url/CHECKOUT_url';
import REFUND_url from '../../imports/utils/enums/url/REFUND_url';

/* Checkout APIs */
import { 
    checkoutCreditCard, 
    checkoutInternetBanking,
    checkoutPromptPay,
    omiseWebHooks
} from '../controller/checkoutController';

/* Refund APIs */
import { sendSMS_afterRefunded } from '../controller/refundController';

/* Upload APIs */
import UPLOAD_url from '../../imports/utils/enums/url/UPLOAD_url';
import { getImage, upload } from '../controller/fileController';

// const uploadFile = require('../middleware/upload');

// Body parse middleware for POST & PUT request
Picker.middleware(bodyParser.json());
Picker.middleware(bodyParser.urlencoded({ extended: false }));

/* Omise: Checkout */
Picker.route(CHECKOUT_url.creditCard, checkoutCreditCard);
Picker.route(CHECKOUT_url.internetBanking, checkoutInternetBanking);
Picker.route(CHECKOUT_url.promptPay, checkoutPromptPay);
Picker.route(CHECKOUT_url.omise_webhook, omiseWebHooks);

/* send SMS after refunded */
Picker.route(REFUND_url.sendSMS, sendSMS_afterRefunded);

/* Upload */
// Picker.route(UPLOAD_url.proof_of_refund, upload, createImage); 
// Picker.route(UPLOAD_url.proof_of_refund, uploadFile, upload); 