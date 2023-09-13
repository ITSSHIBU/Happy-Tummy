import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousel from '../components/Carousel'

export default function Home() {

    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        let responce = await fetch("http://localhost:4000/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        responce = await responce.json()
        // console.log(responce[0],responce[1])

        setFoodCat(responce[1]);
        setFoodItem(responce[0]);
    }

    useEffect(() => {
        loadData()
    }, [])



    return (
        <div>
            <div><Navbar /></div>
            <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
                    <div className="carousel-inner" id='carousel'>
                        <div className='carousel-caption' style={{ zIndex: "10" }}>
                            <div className='d-flex justify-content-center'>
                                <input className='form-control me-2' type='search' placeholder='Search' aria-label='Search' value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                                {/* <button className='btn btn-outline-seccess text-white bg-success' type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="..." className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className='container'>
                {
                    foodCat !== [] ?
                        foodCat.map((data) => {
                            return (<div className='row mb-3'>
                                <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
                                <hr />
                                {foodItem !== [] ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                    .map(filterItem => {
                                        return (
                                            <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>
                                                <Card foodItem = {filterItem}
                                                    options = {filterItem.options[0]}                                                
                                                ></Card>
                                            </div>
                                        )
                                    }
                                    ):<div> No data found</div> }
                            </div>
                            )
                        }) : ""
                }

            </div>

            <div><Footer /></div>
        </div>
    )
}
