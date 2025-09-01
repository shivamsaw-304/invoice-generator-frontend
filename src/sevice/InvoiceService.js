
// in this file we can make request form backend  springboot

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