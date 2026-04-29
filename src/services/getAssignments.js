export default async function getAssignments(id) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/modules/${id}/assignments`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    return response;
};