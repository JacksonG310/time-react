import { APIException, NetworkException, NotificationException } from "@/utils/http/exception";
import { message } from "antd";
export function errorHandler(error: any) {
    if (error instanceof NotificationException) {
        message.success(error.message);
    }
    if (error instanceof NetworkException) {
        message.error(error.message);
    }
    if (error instanceof APIException) {
        message.error(error.errmsg);
    }
}