export default async function deleteAssignment(id) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/assignments/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    return response;
};