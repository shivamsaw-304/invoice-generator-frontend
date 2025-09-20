import {useContext, useEffect, useRef, useState} from 'react';
import { templates } from '../assets/assets';

import InvoicePreview from '../components/invoicePreview';
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {AppContext} from "../context/AppContext.jsx";
import {Loader, Loader2} from "lucide-react";
// import html2canvas from "html2canvas";
// import {uploadInvoiceThumbnail} from "../sevice/CloudinaryService.js";
import {deleteInvoice, saveInvoice, sendInvoice} from "../sevice/InvoiceService.js";
import {generatePdfFromElement} from "../util/pdfUtils.js";
import {useAuth, useUser} from "@clerk/clerk-react";
import html2canvas from "html2canvas";
import {uploadInvoiceThumbnail} from "../sevice/CloudinaryService.js";
// import { useAuth} from "@clerk/clerk-react";

const PreviewPage = () => {
    const previewRef = useRef();
    const { selectedTemplate, invoiceData, setSelectedTemplate,baseURL} = useContext(AppContext);
    // 👆 yahan sabhi AppContecxt ke variables  destructure kiya hai
    const [showModal,setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [downloading,setDownloading] = useState(false);
    const [customerEmail, setCustomerEmail] = useState("");
    const [emailing, setEmailing] = useState(false);
    const {getToken} = useAuth();
    const {user} = useUser();



    const handelSaveAndExit = async () => {
        try{
            setLoading(true);

            const canvas  = await html2canvas(previewRef.current,{
                scale:2,
                userCORS: true,
                backgroundColor:"#fff",
                scrollY:-window.scrollY,

            });
            const imageData = canvas.toDataURL("image/png");
            const thumbnailUrl= await uploadInvoiceThumbnail(imageData);

            const payload = {
                ...invoiceData,
                templates: selectedTemplate,
                thumbnailUrl,
                clerkId: user.id,

            }

            //jwt token
            const token = await getToken()

            const response = await saveInvoice(baseURL,payload,token);
            if(response.status === 200){
                toast.success("invoice saved successfully")
                navigate("/dashboard");
            }else {
                throw new Error("Some thing went wrong")
            }
        }catch (error) {
            toast.error("Failed to save invoice ",error.message);
            console.error(error);
        }finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!invoiceData.id) return toast.error("No invoice ID found.");

        try {

            //jwt token
           const token = await getToken();
            // calling backend apis
            const res = await deleteInvoice(baseURL, invoiceData.id,token);
            if (res.status === 204) {
                toast.success("Invoice deleted.");
                navigate("/dashboard");
            } else {
                toast.error("Unable to delete invoice.");
            }
        } catch (err) {
            toast.error("Delete failed.");
            console.error(err);
        }
    };

    const handleDownloadPdf = async () => {
        if (!previewRef.current) return;
        try {
            setDownloading(true);
            await generatePdfFromElement(previewRef.current, `invoice_${Date.now()}.pdf`)
        } catch (error) {
            toast.error("Failed to generate invoice", error.message);
        } finally {
            setDownloading(false);
        }

    }

    const handleSendEmail = async () => {
        if (!previewRef.current || !customerEmail) {
            return toast.error("Please enter a valid email and try again.");
        }

        try {
            setEmailing(true);

            // Generate the PDF blob
            const pdfBlob = await generatePdfFromElement(
                previewRef.current,
                `invoice_${Date.now()}.pdf`,
                true
            ); // add `returnBlob=true` in your utils

            const formData = new FormData();
            formData.append("file", pdfBlob);
            formData.append("email", customerEmail);
            const token = await  getToken()

            const response = await sendInvoice(baseURL, formData,token);

            if (response.status === 200) {
                toast.success("Email sent successfully!");
                setShowModal(false);
                setCustomerEmail("");
            } else {
                toast.error("Failed to send email.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while sending email.");
        } finally {
            setEmailing(false);
        }
    };

    useEffect(() => {
        if(!invoiceData || !invoiceData.item?.length) {
            toast.error("Invoice data is empty");
            navigate("/dashboard");
        }
    }, [invoiceData,navigate]);

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
                <button className="btn btn-danger" onClick={handleDelete}>Delete Invoice</button>
                <button className="btn btn-secondary" onClick={ ()=>navigate('/dashboard')}>Back to Dashboard</button>
                <button className="btn btn-info" onClick={() => setShowModal(true)}>Send Email</button>
                <button
                    className="btn btn-success d-flex align-items-center justify-content-center"
                    onClick={handleDownloadPdf}
                    disabled={downloading}
                >
                    {downloading && (
                        <Loader2 className="me-2 spin-animation" size={18} />
                    )}
                    {downloading ? "Downloading..." : "Download PDF"}
                </button>


            </div>
         </div>
{/* display the invoice preview */}
   <div className="flex-grow-1 overflow-auto d-flex justify-content-center align-items-start bg-light py-3">
      <div ref={previewRef} className='invoice-preview'>
        <InvoicePreview invoiceData = {invoiceData} template = {selectedTemplate} />
      </div>
   </div>

           {showModal && (
               <div className="modal d-block"  tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                   <div className="modal-dialog" role = "document">
                       <div className="modal-content">
                           <div className="modal-header">
                               <h5 className="modal-title">Send Invoice </h5>
                               <button type={"button"} className="btn-close" onClick={ () => setShowModal(false)}></button>
                           </div>
                           <div className="modal-body">
                               <input type="email"  placeholder= "Customer Email" className="form-control" onChange={(e) => setCustomerEmail(e.target.value)} value={customerEmail} />
                           </div>
                           <div className="modal-footer">
                               <button className="btn btn-primary" type="button" onClick={handleSendEmail} disabled={emailing}>
                                   {emailing ? "sending ...." : "send"}

                               </button>
                               <button className="btn btn-secondary" type="button" onClick={() => setShowModal(false)}> Cancel </button>
                           </div>


                       </div>
                   </div>

               </div>
           )}


 </div>
    )
}

export default PreviewPage;
