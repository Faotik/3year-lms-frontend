export default async function submitAssignment(id, content) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/assignments/${id}/submissions`, {
        method: "POST",
        body: content,
        credentials: "include",
    });

    return response;
};