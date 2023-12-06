import React from 'react';
import "./About.css";
import images from '../../constants/images';

const About = () => {
  return (
    <section className='about section-p bg-dark' id = "about">
        <div className='container'>
            <div className='about-content grid text-center'>
                <div className = "content-left">
                    <img src = {images.about_main_img} alt = "" />
                </div>
                <div className='content-right'>
                    <div className='section-t'>
                        <h3>Nhóm 5</h3>
                    </div>
                    <p className = "text">Bùi Nguyên Phong</p>
                    <p className='text'>Võ Ngọc Hiếu</p>
                    <p className='text'>Nguyễn Minh An</p>
                    <p className='text'>Nguyễn Hà Nam</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default About