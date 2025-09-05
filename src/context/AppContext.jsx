import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

const initialInvoiceData={
    title: "New Invoice",
    billing:{name :"",phone:"",address:""},
    shipping:{name :"",phone:"",address:""},
    invoice :{number:"",date:"",dueDate:""},
    account:{name :"",number:"",ifsccode:""},
    company:{name :"",phone:"",address:""},
    tax :0,
    notes:"",
    items:[
        {name:"",qty:"",amount:"",description:"",total:""},
    ],
    logo:""

};

export const AppContextProvider = ({ children }) => {
    const [invoiceTitle, setInvoiceTitle] = useState("New Invoice ");
    const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
    const [selectedTemplate, setSelectedTemplate] = useState("template1");
  // created base url to connect backend and passed to contextvalue line 29 position 35
    const baseURL = "http://localhost:8080/api"

    const contextValue = {
        invoiceTitle, setInvoiceTitle,
        invoiceData, setInvoiceData,
        selectedTemplate, setSelectedTemplate,
        initialInvoiceData, baseURL
      // and base url passed to contextValue

    };



    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};
