import React from "react";
import { useBooksByAuthorList } from "../../Utils/accessHooks";
import { filterContext } from "../../Pages/Content";
import { useContext } from "react";

const AuthorBooks = ({ authors }) => {
    const { filter, setFilter } = useContext(filterContext);
    const [list, loading] = useBooksByAuthorList(authors);
    // ] = usePagedBookList(10, filter);

    if (loading) {
        return <h3>Loading...</h3>;
    } else {
        return (
            <div>
                {list.map((x) => (
                    <div>{x.title} </div>
                ))}
            </div>
        );
    }
};

export default AuthorBooks;
