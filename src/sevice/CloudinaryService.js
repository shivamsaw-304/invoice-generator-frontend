import axios from "axios";

//apis
const CLOUD_NAME = "dwt7au6z4";          // tumhara Cloudinary cloud_name
const UPLOAD_PRESET = "invoice_preset";  // Cloudinary dashboard me create karo

export const uploadInvoiceThumbnail = async (imageData) => {
    const formData = new FormData();
    formData.append("file", imageData);
    formData.append("upload_preset", "invoices_thumbnail"); // Replace with your preset
    formData.append("cloud_name", "dwt7au6z4"); // Replace with your cloud name

    const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dwt7au6z4/image/upload`, formData  );

    return res.data.secure_url;
};