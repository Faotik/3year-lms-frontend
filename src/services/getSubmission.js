export default async function getSubmission(id) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/assignments/${id}/submissions`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    return response;
};