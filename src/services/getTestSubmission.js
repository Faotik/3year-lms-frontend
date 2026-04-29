export default async function getTestSubmission(id) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tests/${id}/submissions`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    return response;
};