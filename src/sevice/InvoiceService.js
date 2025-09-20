
// in this file we can make request form backend  springboot
// adding java invoiceservice from j
import {AppContext} from "../context/AppContext.jsx";
import axios   from "axios";


export  const saveInvoice = async (baseURL,payload) =>{
    return axios.post(`${baseURL}/invoices`, payload);
}

//API intigration to get all invoices from cloudinary

export  const getAllInvoices = async (baseURL) =>{
    return axios.get(`${baseURL}/invoices`);
}

export const deleteInvoice =  (baseURL,id) =>{
   return   axios.delete(`${baseURL}/invoices/${id}`);
}


export const sendInvoice = async (baseURL,formData) =>{
 return   axios.post(`${baseURL}/invoices/sendinvoice`,formData);
}

