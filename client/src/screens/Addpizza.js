import React, { useState, useEffect } from "react";
import { useDispatch , useSelector } from 'react-redux'
import { addPizza } from "../actions/pizzaActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from '../components/Success'
export default function Addpizza() {
  const [name, setname] = useState("");
  const [smallprice, setsmallprice] = useState();
  const [mediumprice, setmediumprice] = useState();
  const [largeprice, setlargeprice] = useState();
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");
  
  const dispatch = useDispatch()

  const addpizzastate = useSelector(state=>state.addPizzaReducer)
  const {success , error , loading} = addpizzastate
  function formHandler(e){

    e.preventDefault();

    const pizza ={
        name ,
        image,
        description,
        category,
        prices:{
            Küçük : smallprice,
            Orta : mediumprice,
            Büyük : largeprice
        }
    }

    console.log(pizza);
    dispatch(addPizza(pizza));

  }

  return (
    <div>
      <div className='text-left shadow-lg p-3 mb-5 bg-white rounded'>
        <h1>Pizza Ekle</h1>

        {loading && (<Loading/>)}
        {error && (<Error error='Bir hata oluştu!'/>)}
        {success && (<Success success='Yeni Pizza Başarıyla Eklendi!'/>)}

        <form onSubmit={formHandler}>
          <input
            className="form-control"
            type="text"
            placeholder="Pizza İsmi"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Küçük Boy Fiyatı"
            value={smallprice}
            onChange={(e) => {
              setsmallprice(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Orta Boy Fiyatı"
            value={mediumprice}
            onChange={(e) => {
              setmediumprice(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Büyük Boy Fiyatı"
            value={largeprice}
            onChange={(e) => {
              setlargeprice(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="kategori"
            value={category}
            onChange={(e) => {
              setcategory(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="açıklama"
            value={description}
            onChange={(e) => {
              setdescription(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="resim url"
            value={image}
            onChange={(e) => {
              setimage(e.target.value);
            }}
          />
          <button className='btn mt-3' type='submit'>Pizza Ekle</button>
        </form>
      </div>
    </div>
  );
}
