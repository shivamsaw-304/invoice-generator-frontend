import {useContext, useRef} from 'react';
import { templates } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import InvoicePreview from '../components/invoicePreview';

const PreviewPage = () => {
    const previewRef= useRef();
    const {selectedTemplate,invoiceData ,setSelectedTemplate}= useContext(AppContext);
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
                <button className="btn btn-primary d-flex align-item-center justify-content-center">Save and Exit</button>
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
