import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
// import Carousal from '../components/Carousal'

//end point call krna padega yaha par to bring the data of the card on frontend
//end point ka data in the form of props card ko send krna padega
export default function Home() {

    //defining states
    const [foodCat, setFoodCat] = useState([]); //initial value as array [] as this is what we have received from the backend and aray par MAP lgta hai, object par nhi lgta 
    const [foodItem, setFoodItem] = useState([]);

    // creating state forthe search function
    const [search, setSearch] = useState('');

    // fetch from API is an asynchronous operation so we make async array function
    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", { //end point where data is post on backend
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        response = await response.json();
        // console.log(response[0], response[1])

        setFoodItem(response[0]);
        setFoodCat(response[1]);

    }

    useEffect(() => {
        loadData()
    }, []) //here we put dependency of the state dependant on the footer



    // we want the data to be displayed when the data has loaded and stored in the setFooDCategory.
    return (
        <div>
            <div> <Navbar /> </div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" style={{ objectFit: 'contain ', width: '100%' }}>

                    <div className="carousel-inner " id='carousel' >
                        <div className=" carousel-caption  " style={{ zIndex: "9" }}>
                            <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                                {/* <button className="btn text-white bg-success" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active" >
                            <img src="https://source.unsplash.com/random/2100x700/?burger" className="d-block w-100  " style={{ filter: "brightness(50%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/2100x700/?pastry" className="d-block w-100 " style={{ filter: "brightness(50%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/2100x700/?fries" className="d-block w-100 " style={{ filter: "brightness(50%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/2100x700/?pizza" className="d-block w-100 " style={{ filter: "brightness(50%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/2100x700/?noodles" className="d-block w-100 " style={{ filter: "brightness(50%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/2100x700/?cake" className="d-block w-100 " style={{ filter: "brightness(50%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/2100x700/?pasta" className="d-block w-100 " style={{ filter: "brightness(50%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/2100x700/?taco" className="d-block w-100 " style={{ filter: "brightness(50%)" }} alt="..." />
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
                    // ternary operator
                    foodCat.length !== 0
                        ? foodCat.map((data) => {
                            return (
                                // justify-content-center
                                <div className='row mb-3'>
                                    <div key={data._id} className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>
                                    <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                                    {foodItem.length !== 0 ?
                                        foodItem.filter((items) =>
                                            (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                            .map(filterItems => {
                                                return (
                                                    <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                                                        {console.log(filterItems.url)}
                                                        {/* we are passing on the data as PROPS in the Card */}
                                                        <Card foodItem={filterItems}
                                                            options={filterItems.options[0]}
                                                             >

                                                        </Card>
                                                    </div>
                                                )
                                            }) : <div> No Such Data </div>}
                                </div>
                            )
                        })
                        : ""
                }



            </div>
            <div> <Footer /> </div>
        </div>
    )

}
