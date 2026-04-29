export default async function getTest(id) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tests/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    return response;
};