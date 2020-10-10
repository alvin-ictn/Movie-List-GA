import React from 'react';
import './Footer.css';
import google from '../../images/googleplay.png';
import appstore from '../../images/applestore.png';


const Footer = () => {
    return (
        <div className="main-footer">
            <div className="footer-middle">
                <div className="container">
                    <div className="row">
                        {/* Column 1 */}
                        <div className="col-md-4 col-sm-6">
                            <h1> MilanTV</h1>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit dolores expedita alias doloribus modi libero quod sed accusamus adipisci officia omnis fugiat nostrum at perferendis dolorem reprehenderit aliquam rerum, corrupti et nemo.</p>
                        </div>
                        <div className="column2">
                            <ul className="list list-unstyled">
                                <li>
                                    <a href="tentang-kami">Tentang Kami</a>
                                </li>

                                <li>
                                    <a href="blog">Bog</a>
                                </li>
                                <li>
                                    <a href="layanan">Layanan</a>
                                </li>
                                <li>
                                    <a href="karir">Karir</a>
                                </li>
                                <li>
                                <a href="pusat-media">Pusat Media</a>
                                </li> 
                            </ul>
                        </div>
                        <div className="column3">
                            <h1> Download</h1>
                                <a href="google">
                                    <img className="column3__google" src={google}/>
                                </a>  
                                
                                <a href="appstore">
                                    <img className="column3__applestore" src={appstore}/>
                                </a>
                                
                            <h1 className="socialmedia">Social Media</h1>
                            
                                    <a href="facebook">
                                        <img src="https://img.icons8.com/fluent/48/000000/facebook-new.png"/>
                                    </a>
                                
                                    <a href="pintrest">
                                        <img src="https://img.icons8.com/fluent/48/000000/pinterest.png"/>
                                    </a>
                                
                                    <a href="instagram">
                                        <img src="https://img.icons8.com/fluent/48/000000/instagram-new.png"/>
                                    </a>
                                
                        </div>
                    </div>
                <hr className="border-white"/>
                <div className="copyright">
                    <p className="text-center">
                        Copyright &copy;{new Date().getFullYear()} MilanTV - All Rights Reserved
                    </p>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Footer;

