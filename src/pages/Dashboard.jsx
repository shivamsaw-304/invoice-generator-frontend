import {useContext, useEffect, useState} from "react";
import {AppContext} from "../context/AppContext.jsx";
import {getAllInvoices} from "../sevice/InvoiceService.js";
import toast from "react-hot-toast";
import {Plus} from "lucide-react";
import {formatDate} from "../util/formatInvoiceData.js";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@clerk/clerk-react";

const Dashboard = () => {

    const [invoices, setInvoices] = useState([]);
    const {baseURL,setInvoiceData,setSelectedTemplate,setInvoiceTitle,initialInvoiceData} =  useContext(AppContext);
    const navigate = useNavigate();  // navigate hook
    const {getToken} = useAuth()
    useEffect(() => {
        const fetchInvoices = async () => {
            try{

                const token = await getToken()

             const respone = await   getAllInvoices(baseURL,token);
             setInvoices(respone.data)

            }catch (error) {
                toast.error("Faild to load invoice " , error);

            }

        }
        fetchInvoices()
    },[baseURL]);


    const handelViewClick = (invoice) => {
        setInvoiceData(invoice)
        setSelectedTemplate(invoice.template || "template1");
        setInvoiceTitle(invoice.title || "new Invoice");
        navigate('/preview')
    }
    const handleCreateNew = () => {
        // Reset to initial state from context if needed
        setInvoiceTitle("Create Invoice");
        setSelectedTemplate("template1");
        setInvoiceData(initialInvoiceData);
        navigate("/generate");
    };




    return (


      <div className="container py-5">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lf-5 g-4">
              {/*{create new}*/}
              <div className="col">
                  <div onClick={handleCreateNew}
                      className="card h-100 d-flex justify-content-center align-items-center border border-2 border-light shadow-sm"
                      style={{ cursor: "pointer", minHeight: "270px" }}                       >
                   <Plus size={48}/>
                      <p className="mt-3 fw-medium">Create New Invoice</p>
                  </div>
              </div>


              {/* render the existing invoices*/}
              {invoices.map((invoice, idx) => (
                  <div key={idx} className="col">
                      <div
                          className="card h-100 shadow-sm"
                          style={{ cursor: "pointer", minHeight: "270px" }} onClick={ ()=> handelViewClick(invoice)}>
                          {invoice.thumbnailUrl && (
                              <img
                                  src={invoice.thumbnailUrl}
                                  className="card-img-top"
                                  alt="Invoice Thumbnail"
                                  style={{ height: "200px", objectFit: "cover" }}
                              />
                          )}
                          <div className="card-body">
                              <h6 className="card-title mb-1">{invoice.title}</h6>
                              <small className="text-muted">
                                  Last Updated: {formatDate(invoice.lastUpdatedAt)}
                              </small>
                          </div>
                      </div>
                  </div>
              ))}



          </div>
      </div>
    )
}

export default Dashboard;
