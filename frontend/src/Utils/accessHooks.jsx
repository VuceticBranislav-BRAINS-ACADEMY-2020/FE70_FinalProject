/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-26                                                          ║
║                                                                             ║
║  Hooks for backend interaction                                              ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import { useState, useEffect } from "react";
import { useAuth } from "../Authentication/ProvideAuth";

export const usePagedBookList = (
    initialPageSize,
    filter,
    url = "http://localhost:3081/app/books"
) => {
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [list, setList] = useState([]);
    const [location, setLocation] = useState(1);
    const [length, setLength] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [login] = useAuth();

    const load = () => {
        fetch(`${url}/${location}/${location + pageSize - 1}/${filter}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${login.jwt}`,
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.status == "ok") {
                    setLength(data.body.length);
                    setList(data.body.results);
                    setLoading(false);
                    setError(null);
                } else {
                    setLength(0);
                    setList([]);
                    setLoading(false);
                    setError(data.body);
                    console.log(error);
                }
            })
            .catch((err) => {
                setLength(0);
                setList([]);
                setLoading(false);
                setError(err);
                console.log(error);
            });
    };

    useEffect(() => {
        setLoading(true);
        load();
    }, [location, pageSize, url, filter]);

    const pages = Math.ceil(length / pageSize);
    const page = Math.ceil(location / pageSize);

    const forward = () => {
        let from = location + pageSize + 1;
        setLocation(from);
    };

    const back = () => {
        let from = location - pageSize - 1;
        from = from < 1 ? 1 : from;
        setLocation(from);
    };

    const goToPage = (p) => {
        let from = p * pageSize + 1;
        setLocation(from);
    };

    return [
        list,
        location,
        loading,
        error,
        pages,
        page,
        forward,
        back,
        goToPage,
        length,
        pageSize,
        (p) => {
            //setPageSize
            setLoading(true);
            setPageSize(p);
            setLocation(1);
            load();
        },
        () => {
            //reload
            setLoading(true);
            load();
        },
    ];
};

export const usePagedSearchBookList = (
    initialPageSize,
    query,
    filter,
    url = "http://localhost:3081/app/books"
) => {
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [list, setList] = useState([]);
    const [location, setLocation] = useState(1);
    const [length, setLength] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [login] = useAuth();

    const load = () => {
        let targeturl = "";
        if (!query || query.length === 0) {
            targeturl = `${url}/${location}/${
                location + pageSize - 1
            }/${filter}`;
        } else {
            targeturl = `${url}/search/${query}/${location}/${
                location + pageSize - 1
            }/${filter}`;
        }
        fetch(targeturl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${login.jwt}`,
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.status == "ok") {
                    setLength(data.body.length);
                    setList(data.body.results);
                    setLoading(false);
                    setError(null);
                } else {
                    setLength(0);
                    setList([]);
                    setLoading(false);
                    setError(data.body);
                    console.log(error);
                }
            })
            .catch((err) => {
                setLength(0);
                setList([]);
                setLoading(false);
                setError(err);
                console.log(error);
            });
    };

    useEffect(() => {
        setLoading(true);
        load();
    }, [location, pageSize, url, query, filter]);

    const pages = Math.ceil(length / pageSize);
    const page = Math.ceil(location / pageSize);

    const forward = () => {
        let from = location[0] + pageSize + 1;
        setLocation(from);
    };

    const back = () => {
        let from = location[0] - pageSize - 1;
        from = from < 1 ? 1 : from;
        setLocation(from);
    };

    const goToPage = (p) => {
        let from = p * pageSize + 1;
        setLocation(from);
    };

    return [
        list,
        location,
        loading,
        error,
        pages,
        page,
        forward,
        back,
        goToPage,
        length,
        pageSize,
        (p) => {
            setLoading(true);
            setPageSize(p);
            setLocation(1);
            load();
        },
        () => {
            setLoading(true);
            load();
        },
    ];
};

export const usePagedSearchBookListByAuthor = (
    initialPageSize,
    query,
    filter,
    url = "http://localhost:3081/app/books"
) => {
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [list, setList] = useState([]);
    const [location, setLocation] = useState(1);
    const [length, setLength] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [login] = useAuth();

    const load = () => {
        let targeturl = "";
        if (!query || query.length === 0) {
            targeturl = `${url}/${location}/${
                location + pageSize - 1
            }/${filter}`;
        } else {
            targeturl = `${url}/searchByAuthor/${query}/${location}/${
                location + pageSize - 1
            }/${filter}`;
        }
        fetch(targeturl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${login.jwt}`,
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.status == "ok") {
                    setLength(data.body.length);
                    setList(data.body.results);
                    setLoading(false);
                    setError(null);
                } else {
                    setLength(0);
                    setList([]);
                    setLoading(false);
                    setError(data.body);
                    console.log(error);
                }
            })
            .catch((err) => {
                setLength(0);
                setList([]);
                setLoading(false);
                setError(err);
                console.log(error);
            });
    };

    useEffect(() => {
        setLoading(true);
        load();
    }, [location, pageSize, url, query, filter]);

    const pages = Math.ceil(length / pageSize);
    const page = Math.ceil(location / pageSize);

    const forward = () => {
        let from = location[0] + pageSize + 1;
        setLocation(from);
    };

    const back = () => {
        let from = location[0] - pageSize - 1;
        from = from < 1 ? 1 : from;
        setLocation(from);
    };

    const goToPage = (p) => {
        let from = p * pageSize + 1;
        setLocation(from);
    };

    return [
        list,
        location,
        loading,
        error,
        pages,
        page,
        forward,
        back,
        goToPage,
        length,
        pageSize,
        (p) => {
            setLoading(true);
            setPageSize(p);
            setLocation(1);
            load();
        },
        () => {
            setLoading(true);
            load();
        },
    ];
};

export const deleteBook = async (
    id,
    login,
    url = "http://localhost:3081/app/books"
) => {
    const resp = await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${login.jwt}`,
        },
    });
    const data = await resp.json();
    if (data.status === "ok") return [true, ""];
    else return [false, data.body];
};

export const updateBook = async (
    book,
    login,
    url = "http://localhost:3081/app/books"
) => {
    const resp = await fetch(`${url}/${book.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${login.jwt}`,
        },
        body: JSON.stringify(book),
    });
    const data = await resp.json();
    if (data.status === "ok") return [true, ""];
    else return [false, data.body];
};

export const addBook = async (
    book,
    login,
    url = "http://localhost:3081/app/books"
) => {
    const resp = await fetch(`${url}/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${login.jwt}`,
        },
        body: JSON.stringify(book),
    });
    const data = await resp.json();
    if (data.status === "ok") return [true, ""];
    else return [false, data.body];
};

export const useBook = (id, url = "http://localhost:3081/app/book") => {
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [login] = useAuth();

    useEffect(() => {
        setLoading(true);
        fetch(`${url}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${login.jwt}`,
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.status === "ok") {
                    setBook(data.body);
                    setLoading(false);
                }
            });
    }, []);

    return [book, loading];
};

export const useBooksByAuthorList = (
    query,
    url = "http://localhost:3081/app/books/searchByMultipleAuthor"
) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [login] = useAuth();

    const load = () => {
        fetch(`${url}/1/${0xffffffff}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${login.jwt}`,
            },
            body: JSON.stringify({ authors: query }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.status == "ok") {
                    setList(data.body.results);
                    setLoading(false);
                } else {
                    setList([]);
                    setLoading(false);
                }
            })
            .catch((err) => {
                setList([]);
                setLoading(false);
            });
    };

    useEffect(() => {
        setLoading(true);
        load();
    }, [url]);

    return [list, loading];
};
