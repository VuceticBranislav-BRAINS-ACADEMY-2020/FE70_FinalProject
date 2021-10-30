/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-30                                                          ║
║                                                                             ║
║  Button to open page where new book can be added                            ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import BookDetail from "./BookDetail";
import { useAuth } from "../../Authentication/ProvideAuth";
import { addCustomer } from "../../Utils/accessHooks";

// Component
const AddBookPage = () => {
    const [login] = useAuth();
    return (
        <BookDetail
            startingMode="create"
            action={(customer) => addCustomer(customer, login)}
        />
    );
};

// Exports
export default AddBookPage;
