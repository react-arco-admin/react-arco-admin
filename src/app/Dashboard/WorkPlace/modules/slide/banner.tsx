import React from 'react';
import { Carousel } from '@arco-design/web-react';

const imageSrc = [
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/94e8dd2d6dc4efb2c8cfd82c0ff02a2c.jpg~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/94e8dd2d6dc4efb2c8cfd82c0ff02a2c.jpg~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/94e8dd2d6dc4efb2c8cfd82c0ff02a2c.jpg~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/94e8dd2d6dc4efb2c8cfd82c0ff02a2c.jpg~tplv-uwbnlip3yd-webp.webp',
];
function Banner() {
  return (
    <Carousel
      indicatorType="slider"
      showArrow="never"
      autoPlay
      style={{
        marginTop: 16,
        width: '100%',
        height: 160,
      }}
    >
      {imageSrc.map((src, index) => (
        <div key={index}>
          <img
            src={src}
            style={{
              width: 280,
              transform: 'translateY(-30px)',
            }}
          />
        </div>
      ))}
    </Carousel>
  );
}

export default Banner;
