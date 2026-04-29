import { useNavigate } from "react-router-dom";

export default function checkAuth(roles = []) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || (roles.length > 0 && !roles.includes(user.role))) {
        return false;
    }

    return true;
};