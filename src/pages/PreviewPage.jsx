import {useContext, useRef, useState} from 'react';
import { templates } from '../assets/assets';

import InvoicePreview from '../components/invoicePreview';
import {saveInvoice} from "../sevice/InvoiceService.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {AppContext} from "../context/AppContext.jsx";
import {Loader, Loader2} from "lucide-react";
import html2canvas from "html2canvas";
import {uploadInvoiceThumbnail} from "../sevice/CloudinaryService.js";

const PreviewPage = () => {
    const previewRef = useRef();

    const { selectedTemplate, invoiceData, setSelectedTemplate,baseURL} = useContext(AppContext);
    // 👆 yahan sabhi AppContecxt ke variables  destructure kiya hai

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handelSaveAndExit = async () => {
        try {
            setLoading(true);
        const canvas =    await  html2canvas(previewRef.current,{
               cale:2,
               useCORS: true,
               backgroundColor:"#fff",
               scrollY:-window.scrollY,
           })
          const imageData =  canvas.toDataURL("image/png");
          const thumbnailUrl =  await  uploadInvoiceThumbnail(imageData);
          const payload = {
                ...invoiceData,
                thumbnailUrl,
                template: selectedTemplate, // "templates" ki jagah ek template hoga?
            };

            const response = await saveInvoice(baseURL, payload);

            if (response.status === 200) {
                toast.success("Invoice saved successfully ✅");
               navigate("/dashboard") // yahan tu navigate karna ya toast dikhana chahega
            } else {
               toast.error("saved failed");
            }
        }catch (error){
            console.error(error);
            toast.error("Save failed", error.message);

        }finally {
            setLoading(false);
        }


    };
    return (
       <div className="previewpage container-fluid d-flex flex-column p-3 min-vh-100">

         <div className="d-flex flex-column align-items-center mb-4 gap-3">
            {/* list of templsye butttoms*/}
            <div className="d-flex gap-2 flex-wrap justify-content-center">
                {templates.map(({id,label}) => (
                    <button key={id} 
                    style ={{minWidth: "100px", height:"38px"}}
                    onClick={() => setSelectedTemplate(id) }
                    className={`btn btn-outline-primary btn-sm rounded-pill p-2 ${ selectedTemplate ===id  ? 'btn-warning' : 'btn-outline-secondary'}`}>
                        {label}
                    </button>
                ))}
            </div>
               

               {/* list of action btn */}
            <div className="d-flex flex-wrap justify-content-center gap-2">
                <button className="btn btn-primary d-flex align-item-center justify-content-center" onClick={handelSaveAndExit} disabled={loading} >
                    {loading && <Loader2 className="me-2 spin-animation" size={18}/>}
                    {loading ? 'Saving...' : 'Save and Exit'}
                </button>
                <button className="btn btn-danger">Delete Invoice</button>
                <button className="btn btn-secondary">Back to Dashboard</button>
                <button className="btn btn-info">Send Email</button>
                <button className="btn  btn-success d-flex align-item-center justify-content-center">Print</button>


            </div>
         </div>
{/* display the invoice preview */}
<div className="flex-grow-1 overflow-auto d-flex justify-content-center align-item-start bg-light py-3">
<div ref={previewRef} className='invoice-preview'>
<InvoicePreview invoiceData = {invoiceData} template = {selectedTemplate} />

</div>

</div>



       </div>
    )
}

export default PreviewPage;
