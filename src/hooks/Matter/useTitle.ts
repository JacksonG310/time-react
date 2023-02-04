import { TITLE_MAP } from "@/constants/constants";
import { useLocation } from "react-router";

export const useTitle = () => {
    const location = useLocation();

    const path = location.pathname;
    const keys = path.split("/");
    const title = keys.reduce((title, key, index) => {
        const val = TITLE_MAP[key as keyof typeof TITLE_MAP];
        if (!val) return title;
        if (index != keys.length - 1) {
            return title + val + '-';
        } else {
            return title + val;
        }
    }, "");
    return [title];
}