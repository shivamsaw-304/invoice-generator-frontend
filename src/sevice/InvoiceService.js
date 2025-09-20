
// in this file we can make request form backend  springboot
// adding java invoiceservice from j
import {AppContext} from "../context/AppContext.jsx";
import axios   from "axios";


export  const saveInvoice = async (baseURL,payload,token) =>{
    return axios.post(`${baseURL}/invoices`, payload,{
        headers:{Authorization:`Bearer ${token}`}});
}

//API intigration to get all invoices from cloudinary

export  const getAllInvoices = async (baseURL,token) =>{
    return axios.get(`${baseURL}/invoices`,{
        headers:{Authorization:`Bearer ${token}`}});
}

export const deleteInvoice =  (baseURL,id,token) =>{
   return   axios.delete(`${baseURL}/invoices/${id}`,{headers:{Authorization:`Bearer ${token}`}});
}


export const sendInvoice = async (baseURL,formData,token) =>{
 return   axios.post(`${baseURL}/invoices/sendinvoice`,formData,{headers:{Authorization:`Bearer ${token}`}});
}

