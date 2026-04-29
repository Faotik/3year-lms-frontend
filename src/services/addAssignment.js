export default async function addAssignment(data) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/assignments/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
        credentials: "include",
    });

    return response;
};