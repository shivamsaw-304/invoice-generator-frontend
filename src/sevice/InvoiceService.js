import axios   from "axios";

export  const saveInvoice = async (baseURL,payload) =>{
    return axios.post(`${baseURL}/invoices`, payload);
}