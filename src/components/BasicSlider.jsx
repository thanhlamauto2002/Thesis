import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import SwiperCore from 'swiper'

import image1 from '~/assets/anh1.png'
import image2 from '~/assets/anh3.png'
import image3 from '~/assets/quan-trac-khi-thai-ong-khoi-1.png'
import 'swiper/css/scrollbar'
import 'swiper/css/autoplay'
import { Autoplay } from 'swiper/modules'
const MySwiper = () => {

  SwiperCore.use([Autoplay])
  return (
    <Swiper
      className="swiper-container"
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{
        delay: 2500
      }}
      pagination={{ clickable: true }}
      loop={true}
      style={{ height: '100%' }}
    >
      <SwiperSlide style={{ backgroundImage: `url(${image1})`, backgroundSize: 'cover' }}>
      </SwiperSlide>
      <SwiperSlide style={{ backgroundImage: `url(${image2})`, backgroundSize: 'cover' }}>
      </SwiperSlide>
      <SwiperSlide style={{ backgroundImage: `url(${image3})`, backgroundSize: 'cover' }}>
      </SwiperSlide>
    </Swiper>
  )
}
export default MySwiper
