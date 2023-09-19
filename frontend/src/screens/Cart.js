import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { useNavigate } from "react-router-dom";
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  const naviagte = useNavigate();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }
  // const handleRemove = (index)=>{
  //   console.log(index)
  //   dispatch({type:"REMOVE",index:index})
  // }
  
  let date_time = new Date();
  let date = ("0" + date_time.getDate()).slice(-2);
  let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
  let year = date_time.getFullYear();
  let hours = date_time.getHours();
  let minutes = date_time.getMinutes();
  let seconds = date_time.getSeconds();


  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    // console.log("emialuser...",localStorage.getItem("userEmail"))
    let response = await fetch("http://localhost:4000/api/orderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds)
      })
    });
    console.log("JSON RESPONSE ..", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
      
    }
    naviagte('/')
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-light fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody className='text-light'>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="text-danger btn p-0" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>Delete</button> </td></tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2 text-secondary'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Confirm Order </button>
        </div>
      </div>



    </div>
  )
}
