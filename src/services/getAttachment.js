export default async function getAttachment(id) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/assignments/submissions/${id}/attachment`, {
        method: "GET",
        credentials: "include",
    });

    return response;
};