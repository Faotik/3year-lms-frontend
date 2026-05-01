async function getUsers() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    return response;
};

export default getUsers;
