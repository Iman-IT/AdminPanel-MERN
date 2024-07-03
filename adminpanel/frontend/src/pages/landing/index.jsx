import React from 'react'
import Header from '../../components/header'
import s1 from '../../assets/med.jpg'
import s2 from '../../assets/2.jpg'
import './styles.scss'
function LandingPage() {
  return (
    <>
    <Header/>


<div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner text-dark" >
    <div className="carousel-item active">
      <img src={s1} className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h2>First slide label</h2>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src={s2} className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h2>Second slide label</h2>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
   
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>


    </>
   
  )
}

export default LandingPage