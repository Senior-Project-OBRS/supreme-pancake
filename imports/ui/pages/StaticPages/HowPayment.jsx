import React from 'react';
import { Link } from 'react-router-dom';
import './static.css'

export default HowPayment = () => {
    return(
  
    
      <div class="tabs">
        <div class="tabby-tab">
          <input type="radio" id="tab-1" name="tabby-tabs" checked></input>
          <label class = 'hc' for="tab-1">CREDIT/DEBIT CARD</label>
          <div class="tabby-content">
          <img  className = 'imgcard' src="./credit-card.png"/>
          <img  className = 'imgcard2' src="./FILLIN.png"/>
          <img  className = 'imgcard3' src="./CHECK.png"/>
          <img  className = 'imgcard4' src="./MESSAGE.png"/>
          <p class = 'fontcontent'>1. เลือกชำระเงินด้วย Credit/Debit Card</p>
          <p class = 'fontcontent2'>2. กรอกข้อมูลบัตร</p>
          <p class = 'fontcontent3'>3. ยืนยันการชำระเงิน</p>
          <p class = 'fontcontent4'>4. รับ SMS หมายเลขการจอง</p>


          </div>
        </div>
    
        <div class="tabby-tab">
          <input type="radio" id="tab-2" name="tabby-tabs"></input>
          <label class = 'hbk' for="tab-2">iBanking</label>
          <div class="tabby-content">
          <img  className = 'imgib' src="./iBanking.png"/>
          <img  className = 'imgib2' src="./FILLIN.png"/>
          <img  className = 'imgib3' src="./CHECK.png"/>
          <img  className = 'imgib4' src="./MESSAGE.png"/>
          <p class = 'fontcontent'>1. เลือกชำระเงินด้วย iBanking</p>
          <p class = 'fontib2'>2. เข้าสู่ระบบสำหรับ iBanking</p>
          <p class = 'fontcontent3'>3. ยืนยันการชำระเงิน</p>
          <p class = 'fontcontent4'>4. รับ SMS หมายเลขการจอง</p>

          <p class = 'fontmore'>หมายเหตุ : เฉพาะช่องทาง iBanking ต้องรอปรับสถานะ 15 นาทีหลังชำระเงิน</p>

           
          </div>
        </div>
    
        <div class="tabby-tab">
          <input type="radio" id="tab-3" name="tabby-tabs"></input>
          <label class = 'hp' for="tab-3">PromptPay</label>
          <div class="tabby-content">

           <img  className = 'imgp' src="./PromptPay.png"/>
          <img  className = 'imgp2' src="./SCANPAY.png"/>
          <img  className = 'imgp3' src="./MESSAGE.png"/>
          <p class = 'fontprom'>1. เลือกชำระเงินด้วย PromptPay</p>
          <p class = 'fontprom2'>2. Scan QR Code ชำระเงิน</p>
          <p class = 'fontprom3'>3. รับ SMS หมายเลขการจอง</p>
          </div>
        </div>
        
      </div>
           
     )};