import axios from "axios";

export const uploadInvoiceThumbnail = async (imageData) => {
    const formData = new FormData();
    formData.append('file', imageData);
    formData.append('upload_preset', 'invoices-thumbnail'); // ✅ correct spelling
    // formData.append('cloud_name','dwt7au6z4'); // ❌ not needed

    const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dwt7au6z4/image/upload`,
        formData
    );

    return response.data.secure_url;
}
