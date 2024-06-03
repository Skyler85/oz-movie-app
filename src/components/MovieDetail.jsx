import './MovieDetail.css'
import movieDetailData from '../data/movieDetailData.json'
import { useNavigate } from 'react-router-dom';

const MovieDetail = () => {
    const detail = movieDetailData
    const navigate = useNavigate()
    const handleGoHome = (e) => {
        navigate('/')
    }
  return (
    <div className='detail-container'>
        <div className='img-box'>
            <img className='detail__img' src={`https://image.tmdb.org/t/p/original${detail.poster_path}`} alt={detail.title} />
        </div>
        <div className='detail__info'>
            <div className='detail__head'>
                <h2>{detail.title}</h2>
                <p>⭐️ {detail.vote_average}</p>
            </div>
            <div className='detail__genre'>
                {detail.genres.map((genre => {
                return <button className='genre-btn'>{genre.name}</button>
            }))}
            </div>
            <div className='detail__overview'>
                {detail.overview}
            </div>
            <div className='home-link'>
                <button onClick={handleGoHome}>〈</button>
            </div>
        </div>

    </div>
  )
}

export default MovieDetail