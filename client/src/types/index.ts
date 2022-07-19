import {ExoticComponent} from "react";

export type iRoute = {
    path: string,
    component: ExoticComponent
}

export type iSidebarRoute = {
    path: string,
    display: string,
    enabled: boolean,
    icon: any
};