import './MovieBanner.css'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/bundle'
import 'swiper/css/autoplay'
import axios from '../api/axios';
import requests from '../api/requests'

const MovieBanner = () => {
    const fetchData = async () => {
        const response = await  axios.get(`${requests.fetchNowPlaying}`)
        console.log(response.data.results)

    }
    fetchData()

    return (
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
    );
};

export default MovieBanner;