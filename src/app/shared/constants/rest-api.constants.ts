import { InjectionToken } from "@angular/core";

export let API_CONFIG = new InjectionToken("app.config");

export const restApiSuffix = {
    LOGIN: 'api/sessions/sign_in?user_login=true&subdomain=&site_id=',
    GETALL_COMPLAINTS: 'cms/complaints?page=1',
}