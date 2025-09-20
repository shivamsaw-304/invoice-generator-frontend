# invoice-generator-frontend

This project uses React + Vite with HMR and ESLint.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration


If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


Part 7: Integration
Add the backend base url in App context 
Create service to consume the backend API
Call the service method from preview page to save the details


Part 11: Create PDF and download
Create utility method to create PDF
Call utility method to download the PDF

Part 12: Attach PDF and send emails to clients
create an account in Brevo
Configure the email service in  --- java
Create a backend API to send emails -- in java
Creat a service to consume the backend API - in React.js (invoiceServices)
Create modal to send email 
Test the implementation