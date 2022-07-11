import React from 'react';
import { Link } from 'react-router-dom';
import './static.css'

export default About = () => {
    // const setVar = () => {
    //     Session.set('Meteor.loginButtons.dropdownVisible', true);
    // }

    return(
        <div className ='card_about'>
            <h1>เกี่ยวกับเรา</h1>
            <p>
            &emsp;&emsp;&emsp;&emsp;ระบบจองตั๋วออนไลน์ ภายใต้ห้างหุ้นส่วนจำกัด เอ็น.เจ. ทราเวล แอนด์ ทรานสปอร์ต (N.J. TRAVEL &amp; TRANSPORT LIMITED PARTNERSHIP)
                <br/>ให้บริการรับ-ส่งผู้โดยสาร และพัสดุในเส้นทางกรุงเทพฯ - ชลบุรี (บ้านบึง) ด้วยรถโดยสารสาธารณะประจำทางที่ได้รับใบอนุญาตประกอบการขนส่งจากการทำสัญญา "รถร่วม" กับ บริษัทขนส่ง จำกัด (บขส.)
                <br/>จุดจอด
                <br/> - ฝั่งกรุงเทพฯ : หมอชิต - พระราม 9 - ศรีนครินทร์ - ลาดกระบัง 
                <br/> - ฝั่งชลบุรี : หนองรี - บ้านบึง - หนองชาก
                <br/> สถานที่จำหน่ายตั๋วรถโดยสาร
                <br/>- กรุงเทพฯ (หมอชิต) : 
                        <a 
                            href="https://goo.gl/maps/F5j8v2ofGd5gELdP9"
                            target="_blank" 
                            style={{ textDecoration: 'none' }}
                        >
                            อาคาร C ช่อง 5 ในสถานีรถตู้จตุจักรใหม่ (ตรงข้าม บขส. หมอชิต)
                        </a>
                    - ชลบุรี
                        (บ้านบึง) :
                            <a 
                                href="https://goo.gl/maps/M7MHSzFzyEjDjVbm6"
                                target="_blank" 
                                style={{ textDecoration: 'none' }}
                            >
                                ที่เต็นท์อาหาร ตลาดวิศิษฐ์ชัย
                            </a>
                        (หนองชาก) :
                            <a 
                                href="https://g.page/nj_phuyaipu?share"
                                target="_blank" 
                                style={{ textDecoration: 'none' }}
                            >
                                ที่ทำการผู้ใหญ่บ้าน ม.3 ฝั่งเดียวกับร้านสมศักดิ์ฟาร์มาซี
                            </a>
            </p>

            <h1>ติดต่อเรา</h1>
            <p>อีเมล : th.peeranut@gmail.com</p>
            <p>
                ห.จ.ก. เอ็น.เจ. ทราเวล แอนด์ ทรานสปอร์ต 
                3/5 ม.3 ต.หนองชาก อ.บ้านบึง จ.ชลบุรี 20170
                โทร. 090-562-2019
                เปิดให้บริการทุกวันตั้งแต่ 07:00 - 17:30 น.
            </p>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            
            <a href = 'https://www.facebook.com/nj.phuyaipu'>
            <img position = 'center' src={"./facebook.png"} className ='imgface'/>
            </a>
            
        </div>
            
      

        // <TransitionGroup
        //     component="div"
        //     transitionName="route"
        //     transitionEnterTimeout={600}
        //     transitionAppearTimeout={600}
        //     transitionLeaveTimeout={400}
        //     transitionAppear={true}>
        //     <h1>About Us</h1>
        //     {/* <a href='/login'>Login to continue</a> */}
        //     <p>
        //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quis numquam dolore facere exercitationem ad nostrum minima accusamus, facilis suscipit ipsum magnam id adipisci dolorum? Blanditiis consectetur ut ipsa itaque.
        //     </p>
        //     {/* <button onClick={setVar}>Sign Up</button> */}
        // </TransitionGroup> 
    );
};