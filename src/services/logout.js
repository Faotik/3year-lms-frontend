export default async function logout() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    return response;
};