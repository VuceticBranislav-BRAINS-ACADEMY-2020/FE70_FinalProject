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
import { addBook } from "../../Utils/accessHooks";

// Component
const AddBookPage = () => {
    const [login] = useAuth();
    return (
        <BookDetail
            startingMode="create"
            action={(book) => addBook(book, login)}
        />
    );
};

// Exports
export default AddBookPage;
