export const formatInvoiveData = (invoiceData) => {
    const {
        company = {},
        invoice = {},
        account = {},
        billing = {},
        tax = 0,
        notes = "",
        items = [],
        logo = ""
    } = invoiceData || {};

    const subtotal = items.reduce((acc, item) => acc + (Number(item.qty) * Number(item.amount)), 0);
    const taxAmount = subtotal * (Number(tax) / 100);
    const total = subtotal + taxAmount;

    return {
        companyLogo: logo,
        companyName: company.name || "",
        companyAddress: company.address || "",
        companyPhone: company.phone || "",
        billingName: billing.name || "",
        billingAddress: billing.address || "",
        billingPhone: billing.phone || "",
        invoiceNumber: invoice.number || "",
        invoiceDate: invoice.date || "",
        paymentDate: invoice.dueDate || "",
        items,
        subtotal,
        tax,
        taxAmount,
        total,
        accountName: account.name || "",
        accountNumber: account.number || "",
        accountIfscCode: account.ifsccode || "",
        notes,
    };
};
export const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";

    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};