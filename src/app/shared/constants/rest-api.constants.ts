import { InjectionToken } from "@angular/core";

export let API_CONFIG = new InjectionToken("app.config");

export const restApiSuffix = {
    LOGIN: 'api/sessions/sign_in?user_login=true&subdomain=&site_id=',
    GETALL_COMPLAINTS: 'cms/complaints?',
    GET_DEPARTMENTS:"cms/departments?page=1&query=&subdomain=",
    SHOW_COMPLENT:"cms/complaints/",
    STAFF_AND_FIELD:"api/admin/users/department_users",
    UPDATE_BY_ID:"cms/complaints/"
}