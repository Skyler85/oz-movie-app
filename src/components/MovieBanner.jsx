import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import { buildImageUrl } from '../util/constant';
import '../style/MovieBanner.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const MovieBanner = ({ nowMovies }) => {
  console.log(nowMovies);
  if (!nowMovies) return null;

  return (
    <Swiper
      navigation={true}
      pagination={true}
      modules={[Navigation, Pagination, EffectFade]}
      effect='fade'
      className='mySwiper'
    >
      {nowMovies &&
        nowMovies.map((item) => (
          <SwiperSlide key={item.id}>
            <img src={buildImageUrl(item.backdrop_path)} />
            <div className='banner-container'>
              <p className='banner__title'>
                {item.title} {' '}
              <span className='banner__original-title'>
                {item.original_language === 'ko' ? '' : item.original_title}
              </span>
              </p>
              <p className='banner__descript'>{item.overview}</p>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default MovieBanner;