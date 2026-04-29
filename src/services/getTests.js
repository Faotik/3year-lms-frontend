export default async function getTests(id) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/modules/${id}/tests`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    return response;
};