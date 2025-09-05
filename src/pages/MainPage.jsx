import { useState } from "react"; // ✅ Yeh likhna zaroori hai
import { NavigationIcon, Pencil } from "lucide-react"; // ✅ Add this line at the top
import { AppContext } from "../context/AppContext";
import { useContext } from "react"; // ✅ Yeh bhi zaroori hai
import InvoiceForm from "../components/InvoiceForm";
import TemplateGrid from "../components/TemplateGrid"; // ✅ Import the TemplateGrid component
import toast   from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MainPage = () => {

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const navigate = useNavigate(); // on click of template, navigate to preview page

  const { invoiceTitle, setInvoiceTitle ,setInvoiceData
    ,setSelectedTemplate,invoiceData

 } = useContext(AppContext);


const handleTemplateClick = (templateId) => {
    const hasInvalitItem = invoiceData.items.some(
        (item)=> !item.qty || !item.amount
    )
    if(hasInvalitItem){
        toast.error("Please fill all item details before changing template");
        return;
    }
    setSelectedTemplate(templateId);
    navigate('/preview'); // Navigate to the preview page

}

  const handleTitleChange = (e) =>{
    const newTitle = e.target.value;
    setInvoiceTitle(newTitle);
    setInvoiceData((prevData) => ({
      ...prevData,
      title: newTitle
    }));

  }

  const handleTitleEdit = () => {
    setIsEditingTitle(true);
  }

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  }

   
    return (
        <div className="mainpage conitainer-fluid bg-light min-vh-100 py-4">
            <div className="container">
              
                <div className="bg-white border rounded shadow-sm p3 mb-4">
                    <div className="d-flex align-items-center">
                    {isEditingTitle?(
                        <input type="text" 
                            className="form-control me-2"
                            autoFocus 
                            onBlur={handleTitleBlur}
                            onChange={handleTitleChange}
                            value  = {invoiceTitle}
                            />
                            

                    ):(
                        <>
                        <h5 className="mb-0 me-2">{invoiceTitle}</h5>
                        <button className="btn btn-sm p-0 border-0 bg-transparant"
                        onClick={handleTitleEdit}
                        >
                            <Pencil className="text-primary" size={20}>e</Pencil>
                        </button>
                        </>

                    )}
                    </div>
                </div>
                {/* Invoice Form */}
                <div className="row g-4 align-items-stretch">
                    
                    <div className="col-12 col-lg-6 d-flex">
                        <div className="bg-white border rounded shadow-sm p-4 w-100">
                           <InvoiceForm />
                        </div>
                    </div>
                    {/*Template */}

                    <div className="col-12 col-lg-6 d-flex">
                        <div className="bg-white border rounded shadow-sm p-4 w-100">
                            <TemplateGrid onTemplateClick={handleTemplateClick} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MainPage;
