export default async function getUpcoming() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/calendar/upcoming`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    return response;
};
