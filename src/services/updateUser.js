async function updateUser(userId, userData) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
    });

    return response;
};

export default updateUser;
