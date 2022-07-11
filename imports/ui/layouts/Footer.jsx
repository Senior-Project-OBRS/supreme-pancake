import React from 'react';
import { Nav } from 'react-bootstrap';
import "./Footer.css";

export default Footer = () => {
    return (
        <div id = 'footer' className="footer">
            <div className= 'container'>
                <div className="row">
                    {/* Column 1 */}
                    <div className="col-md-3 col-sm-6">
                        <h4>NJ Phuyaipu</h4>
                        <ul className="list-unstyled">
                            <li><Nav.Link href="/">หน้าแรก</Nav.Link></li>
                            <li><Nav.Link href="/about">เกี่ยวกับเรา</Nav.Link></li>
                            {/* <li>เที่ยวรถทั้งหมด</li> */}
                        </ul>
                    </div>

                    {/* Column 2 */}
                    <div className="col-md-3 col-sm-6">
                        <h4>บัญชี</h4>
                        <ul className="list-unstyled">
                        <li><Nav.Link href="/register">สมัครสมาชิก</Nav.Link></li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div className="col-md-3 col-sm-6">
                        <h4>สนับสนุน</h4>
                        <ul className="list-unstyled">
                            {/* <li>คำถามที่พบบ่อย</li>
                            <li>วิธีการจอง</li>
                            <li>ศูนย์ช่วยเหลือ</li> */}
                            <li><Nav.Link href="/terms-and-conditions">ข้อกำหนดและเงื่อนไข</Nav.Link></li>
                            <li><Nav.Link href="/privacy-policy">นโยบายความเป็นส่วนตัว</Nav.Link></li>
                            <li><Nav.Link href="/dataprotection-policy">นโยบายการคุ้มครองข้อมูล</Nav.Link></li>
                        </ul>
                    </div>

                    {/* Column 4 */}
                    <div className="col-md-3 col-sm-6">
                        <h4>ติดตามเรา</h4>
                        <ul className="list-unstyled">
                            <a href='https://www.facebook.com/nj.phuyaipu'>Facebook</a>
                        </ul>
                    </div>
                </div>
                {/* Footer Bottom */}
                <div className="footer-bo">
                    <p className="text-xs-ce">
                        &copy;{new Date().getFullYear()} NJ-Phuyaipu.meteorapp.com - All Right Reserved
                    </p>
                </div>
            </div>    
        </div>
    );
};