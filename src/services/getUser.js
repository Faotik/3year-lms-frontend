export default async function getUser() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    return response;
};