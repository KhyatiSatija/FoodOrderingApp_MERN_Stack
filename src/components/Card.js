import React, { useState, useRef, useEffect } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
export default function Card(props) {

    let dispatch = useDispatchCart();
    let data = useCart()

    //hook reference for the price'
    const priceRef = useRef();

    let options = props.options; //options is an object
    // Object.keys is an inbuilt javascript function
    let priceOptions = Object.keys(options); //half, full are the keys


    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")



    // let foodItem = props.foodItems;

    const handleAddToCart = async () => {
        let food = []
        for(const item of data){
            if(item.id === props.foodItem._id){
                food = item;
                break;
            }
        }
        if(food.length !== 0){
            if(food.size === size){
                await dispatch({ type: "UPDATE", id : props.foodItem._id, price: finalPrice, qty: qty})
                return
            }
            else if (food.size !== size){
                await dispatch({type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
                return
            }
            return
        }
        await dispatch({type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        
        // console.log(data)
    }


    let finalPrice = qty * parseInt(options[size]);


    useEffect(()=>{
        setSize(priceRef.current.value)
    }, [])

    return (
        <div>
            <div className="card m-5" style={{ "width": "18rem", "maxHeight": "360px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height: '200px', objectFit : 'fill'}}/>
                <div className="card-body ">
                    <h5 className="card-title"> {props.foodItem.name}</h5>
                    {/* <p className="card-text">some imp text</p> */}
                    <div className='container w-150'>
                        <select className='m-2 h-100 bg-success rounded'  onChange={(e)=> setQty(e.target.value)} >
                            {/* everything inside the curly braces will be considered as javascript */}
                            {Array.from(Array(10), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}> {i + 1} </option>
                                )
                            })}
                        </select>

                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
                            {
                                priceOptions.map((data) => {
                                    return (
                                        <option key={data} value={data}> {data} </option>
                                    )
                                })
                            }
                        </select>

                        <div className='d-inline ms-2 h-100 w-20 fs-5'> 
                            ₹{finalPrice}/-
                        </div>
                        <hr></hr>
                        <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
