import BookDetail from "./BookDetail";
import { useAuth, ProvideAuth } from "../../Authentication/ProvideAuth";
import { addCustomer } from "../../Utils/accessHooks";

const AddBookPage = () => {
    const [login] = useAuth();
    return (
        <BookDetail
            startingMode="create"
            action={(customer) => addCustomer(customer, login)}
        />
    );
};

export default AddBookPage;
