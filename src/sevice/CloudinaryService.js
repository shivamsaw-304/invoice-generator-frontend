import axios from "axios";
//import {image} from "html2canvas/dist/types/css/types/image.js";

export const uploadInvoiceThumbail = async (imageData) => {
    const formData = new FormData();
    formData.append('file',imageData);
    formData.append('upload_present','invoices-thumbnail');
    formData.append('cloud_name','dwt7au6z4')

    const response =  await axios.post(`https://api.cloudinary.com/v1_1/dwt7au6z4/image/upload`,formData,);

    return response.data.secure_url;

}