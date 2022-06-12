import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPizza, getPizzaById } from "../actions/pizzaActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success";
export default function Editpizza({ match }) {
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [smallprice, setsmallprice] = useState();
  const [mediumprice, setmediumprice] = useState();
  const [largeprice, setlargeprice] = useState();
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");

  const getpizzabyidstate = useSelector((state) => state.getPizzaByIdReducer);

  const { pizza, error, loading } = getpizzabyidstate;

  const editpizzastate = useSelector((state) => state.editPizzaReducer)
  const {editloading , editerror , editsuccess} = editpizzastate;

  useEffect(() => {

    if(pizza)
    {
        if(pizza._id==match.params.pizzaid)
        {
            setname(pizza.name)
            setdescription(pizza.description)
            setcategory(pizza.category)
            setsmallprice(pizza.prices[0]['Küçük'])
            setmediumprice(pizza.prices[0]['Orta'])
            setlargeprice(pizza.prices[0]['Büyük'])
            setimage(pizza.image)
        }
        else{
            dispatch(getPizzaById(match.params.pizzaid));
        }
        
    }
    else{
        dispatch(getPizzaById(match.params.pizzaid));
    }



  }, [pizza , dispatch]);

  function formHandler(e) {
    e.preventDefault();

    const editedpizza = {
      _id : match.params.pizzaid,
      name,
      image,
      description,
      category,
      prices: {
        Küçük: smallprice,
        Orta: mediumprice,
        Büyük: largeprice,
      },
    };

    dispatch(editPizza(editedpizza))
  }

  return (
    <div>
    
     

      <div className="text-left shadow-lg p-3 mb-5 bg-white rounded">
      <h1>Düzenle</h1>
        {loading && <Loading />}
        {error && <Error error="Bir Sorun Oluştu" />}
        {editsuccess && (<Success success='Pizza detayları başarıyla düzenlendi'/>)}
        {editloading && (<Loading />)}

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
          <button className="btn mt-3" type="submit">
            Pizzayı Düzenle
          </button>
        </form>
      </div>
    </div>
  );
}
