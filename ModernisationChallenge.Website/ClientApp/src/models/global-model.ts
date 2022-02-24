import { FC } from "react";

export interface IRoute {
    key: string;
    path: string;
    component: FC;
    name: string;
    exact: boolean;
    icon?: string;
    authen?: "required";
}