# Online Bus Reservation System
เนื่องจากการเปิดรับจองตั๋วรถผ่านทาง Facebook Fanpage ทำให้ทุกครั้งที่ลูกค้า inbox เข้ามา พนักงานขายตั๋วโดยสารจะมีขั้นตอนการทำงาน ดังนี้
1. แจ้งรอบรถที่เปิดให้บริการ
2. ตรวจสอบข้อมูลการเดินทางของผู้โดยสาร
3. ตรวจสอบยอดการชำระเงิน (โอนเงิน)
4. นำข้อมูลการเดินทางของผู้โดยสาร ลงในเว็บขายตั๋วรถออนไลน์
5. ส่งรูปตั๋วให้ลูกค้า

ระบบจองตั๋วรถออนไลน์นี้ จึงมีวัตถุประสงค์เพื่อลดภาระงานของพนักงานขายตั๋วโดยสาร และอำนวยความสะดวกในการจองตั๋วของลูกค้า โดยเฉพาะอย่างยิ่งในกรณีที่มีลูกค้าหลายคน inbox เข้ามาใน Facebook Fanpage พร้อมกัน 

### System Overview
<img src="public/about_me/system-overview.png" width="700"> <br/>

### Database Diagram
<img src="public/about_me/database-diagram.JPG" width="700"> <br/>

### Use Cases by User Role
<img src="public/about_me/use-cases.JPG" width="700"> <br/>

## User Interface
### Customer
#### 1. จองตั๋ว
[<img src="public/about_me/customer/book/book-preview.png" width="50%">](https://youtu.be/g-1cvXG3Aos) <br/>

#### 1.1 ชำระโดย Credit/Debit card
<img src="public/about_me/customer/book/paywith-credit-card.gif" width="600"> <br/>

#### 1.2 ชำระโดย iBanking
<img src="public/about_me/customer/book/paywith-iBanking.gif" width="600"> <br/>

<img src="public/about_me/customer/book/iBanking.jpg" height="500"> <br/>

#### 1.3 ชำระโดย PromptPay
<img src="public/about_me/customer/book/paywith-promptPay.gif" width="600"> <br/>

เมื่อชำระเงินเรียบร้อยแล้ว จะได้รับ sms <br/>
<img src="public/about_me/customer/book/sms-after-payment.jpg" width="350"> <br/>

#### 2. เลื่อนตั๋ว


#### 3. ยกเลิกตั๋ว

#### 4. แสดง E-ticket

#### 5. เช็คอิน

### Salesperson
#### 1. เพิ่ม-ลบ รถโดยสาร
<img src="public/about_me/salesperson/bus-management.JPG" width="700"> <br/>

#### 2. เพิ่ม-ลบ เส้นทาง
<img src="public/about_me/salesperson/route-management.JPG" width="700"> <br/>

#### 3. แก้ไขค่าโดยสาร และเวลาในการเดินทาง
<img src="public/about_me/salesperson/price-time.JPG" width="700"> <br/>

#### 4. เพิ่ม-ลบ ตารางเดินรถ
<img src="public/about_me/salesperson/bus_schedule-management.JPG" width="700"> <br/>

#### 5. ตรวจสอบรอบรถ และยกเลิการจอง
<img src="public/about_me/salesperson/homepage.png" width="450"> <br/>

#### 6. เช็คอินให้ผู้โดยสาร
<img src="public/about_me/salesperson/checkin-1.png" height="400"> &nbsp;
<img src="public/about_me/salesperson/checkin-2.png" height="400"> <br/>

#### 7. ตรวจสอบการคืนเงิน
<img src="public/about_me/salesperson/refund-management.png" width="700"> <br/>

### Driver
#### 1. ตารางขับรถ
<img src="public/about_me/driver/driving-schedule.png" width="450"> <br/>

#### 2. เช็คอินให้ผู้โดยสาร
<img src="public/about_me/salesperson/checkin-1.png" height="400"> &nbsp;
<img src="public/about_me/salesperson/checkin-2.png" height="400"> <br/>

### Admin
#### 1. แก้ไขบทบาทผู้ใช้ และ 2. ลบผู้ใช้งาน
<img src="public/about_me/admin/change-user-role.png" width="450"> <br/>

## E2E testing
lorem

## For Developers
### Installation
Step1: `$ git clone https://github.com/Senior-Project-OBRS/supreme-pancake.git`<br/> 
Step2: `$ meteor npm install --save`<br/> 

### Build
Step1: create settings.json in the root directory with the following parameters <br/>
Step2: `$ meteor run --settings settings.json`<br/>

![settings.json](/public/about_me/settings-file.JPG)

### Run Testing
- full-app tests `$ meteor test --full-app --driver-package meteortesting:mocha --port 3100`
- unit tests `$ meteor test --driver-package meteortesting:mocha --port 3100`

### Deploy
`$ meteor deploy nj-phuyaipu.meteorapp.com --free --mongo --settings settings.json`