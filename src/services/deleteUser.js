async function deleteUser(userId) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${userId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    return response;
};

export default deleteUser;
