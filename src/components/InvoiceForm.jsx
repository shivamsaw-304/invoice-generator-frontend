import { Trash } from "lucide-react";

const InvoiceForm = () => {
    return (
      <div className="invoiceform container py-4">
        <div className="mb-4">
           <h5>Company logo</h5>
           <div className="d-flex align-items-center gap-3">
            <label htmlFor="image" className="form-label">
                <img src="{assets.upload_area}" alt="upload" width={98} />
            </label>
            <input type="file" name="logo" id="image"  hidden className="form-control" accept="image/*"/>
           </div>
        </div>
        <div className="mb-4">
           <h5>Your company</h5>
           <div className="row g-3">
            <div className="col-md-6">
                <input type="text" className="form-control" placeholder="Company Name" />
            </div>
             <div className="col-md-6">
                <input type="text" className="form-control" placeholder="Company phone" />
            </div>
             <div className="col-md-12">
                <input type="text" className="form-control" placeholder="Company address" />
            </div>
           </div>
        </div>
        <div className="mb-4">
          <h5>Bill To</h5>
           <div className="row g-3">
            <div className="col-md-6">
                <input type="text" className="form-control" placeholder="Name" />
            </div>
             <div className="col-md-6">
                <input type="text" className="form-control" placeholder=" Phone nunmber" />
            </div>
             <div className="col-md-12">
                <input type="text" className="form-control" placeholder="Address" />
            </div>
           </div>
        </div>
        <div className="mb-4">
              <h5> Ship To</h5>
              <div className="form-check">
                <input type="checkbox"  className="form-check-input" id="sameAsBilling" />
                <label className="form-check-label" htmlFor="sameAsBilling">
                    Same as billing
                </label>
              </div>
           <div className="row g-3">
            <div className="col-md-6">
                <input type="text" className="form-control" placeholder="Name" />
            </div>
             <div className="col-md-6">
                <input type="text" className="form-control" placeholder=" Phone nunmber" />
            </div>
             <div className="col-md-12">
                <input type="text" className="form-control" placeholder=" Shipping Address" />
            </div>
           </div>
        </div>
        <div className="mb-4">
             <h5>Invoice information</h5>
           <div className="row g-3">
            <div className="col-md-4">
                <label className="form-label" htmlFor="invoiceNumber">Invoice Number</label>
                <input type="text" disabled className="form-control" placeholder="Invoice Number" id ="invoiceNumber"/>
            </div>
             <div className="col-md-4">
                <label className="form-label" htmlFor="invoiceDate">Invoice Date</label>
                <input type="date" className="form-control" id="invoiceDate" />
            </div>
             <div className="col-md-4">
                <label className="form-label" htmlFor="invoiceDueDate">Invoice Due Date</label>
                <input type="date" className="form-control" id="invoiceDueDate" />
            </div>
           </div>
        </div>
        <div className="mb-4">
           <h5>Item Details</h5>
           <div className="card p-3 mb-3">
            <div className="row g-3 mb-2">
                <div className="col-md-3">
                    <input type="text" className="form-control" placeholder="Item Name"  />
                </div>
                <div className="col-md-3">
                    <input type="number" className="form-control" placeholder="Qty" />
                </div>
                <div className="col-md-3">
                    <input type="number" className="form-control" placeholder="Amount" />
                </div>
                <div className="col-md-3">
                    <input type="number" className="form-control" placeholder="Total" />
                </div>
                
            </div>
            <div className="d-flex gap-2">
                <textarea placeholder="Description" className="form-controller"></textarea>
                <button className="btn btn-outline-danger"type="button">
                    <Trash size={18}/>
                </button>

            </div>
           </div>
        </div>
        <div className="mb-4">
                 <h5>Bank account details</h5>
           <div className="row g-3">
            <div className="col-md-4">
                <input type="text" className="form-control" placeholder="Account Holder Name"/>
            </div>
             <div className="col-md-4">
                {/* <label className="form-label" htmlFor="invoiceDate">Invoice Date</label> */}
                <input type="number" className="form-control" placeholder="Account number"  />
            </div>
             <div className="col-md-4">
                {/* <label className="form-label" htmlFor="invoiceDueDate">Invoice Due Date</label> */}
                <input type="text" className="form-control" placeholder="Branch code /IFSC code" />
            </div>
           </div>
        </div>
        <div className="mb-4">
          <h5>Totals</h5>
          <div className="d-flex justify-contend0end">
            <div className="w-100 w-md-50">
                <div className="d-flex justify-content-between">
                    <span>Subtotal</span>
                    <span>Rs1000.00</span>
                </div>
                <div className="d-flex justify-content-between"></div>
                <div className="d-flex justify-content-between"></div>
                <div className="d-flex justify-content-between"></div>
            </div>
          </div>
        </div>
        <div className="mb-4">
            notes
        </div>
      </div>
    );
};

export default InvoiceForm;
