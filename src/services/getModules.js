export default async function getModules() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/modules/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    return response;
};