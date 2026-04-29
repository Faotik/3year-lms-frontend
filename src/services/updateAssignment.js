export default async function updateAssignment(id, data) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/assignments/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
        credentials: "include",
    });

    return response;
};