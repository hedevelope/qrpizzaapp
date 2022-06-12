import React , {useState, useEffect} from 'react'
import {useDispatch , useSelector} from 'react-redux'
import { getUserOrders } from '../actions/orderActions'
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from '../components/Success'
import AOS from 'aos'
import 'aos/dist/aos.css';
export default function Ordersscreen() {
    
    AOS.init()
    const dispatch = useDispatch()
    const orderstate = useSelector(state=>state.getUserOrdersReducer)
    const {orders , error , loading} = orderstate

    useEffect(() => {

        dispatch(getUserOrders())
      
    }, [])

    return (
        <div>
            <h2 style={{fontSize:'35px'}}>Siparişlerim</h2>
            <hr/>
            <div className="row justify-content-center">
                {loading && (<Loading/>)}
                {error && (<Error error='Bir hata oluştu!'/>)}
                {orders && orders.map(order=>{
                    return <div className="col-md-8 m-2 p-1" data-aos='fade-down'  style={{backgroundColor:'red' , color:'white'}}>

                            <div className="flex-container">
                                <div className='text-left w-100 m-1'>
                                    <h2 style={{fontSize:'25px'}}>Siparişler</h2>
                                    <hr/>
                                    {order.orderItems.map(item=>{
                                        return <div>
                                            <p>{item.name} [{item.varient}] * {item.quantity} = {item.price}</p>
                                        </div>
                                    })}
                                </div>
                                <div className='text-left w-100 m-1'>
                                   
                                <h2 style={{fontSize:'25px'}}>Adres</h2>
                                <hr/>
                                <p>Sokak : {order.shippingAddress.street}</p>
                                <p>Şehir : {order.shippingAddress.city}</p>
                                </div>
                                <div className='text-left w-100 m-1'>
                                <h2 style={{fontSize:'25px'}}>Sipariş Detayı</h2>
                                <hr/>
                                <p>Sipariş Fiyatı : {order.orderAmount} ₺</p>
                                <p>Tarih : {order.createdAt.substring(0,10)}</p>
                                <p>İşlem NO : {order.transactionId}</p>
                                <p>Sipariş NO : {order._id}</p>
                                </div>
                            </div>

                    </div>
                })}
            </div>
        </div>
    )
}
