export default async function submitTest(id, data) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tests/${id}/submissions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
        credentials: "include",
    });

    return response;
};