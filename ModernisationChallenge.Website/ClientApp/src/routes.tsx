import Home from "./pages/home";
import { FC } from "react";
import { KEY_PAGE } from "@utils/constant-data";
import { IRoute } from "./models/global-model";

export class Pages {
    public readonly key: string;
    public readonly path: string;
    public readonly namePage: string;
    public readonly page: FC;

    private constructor(key: string, path: string, namePage: string, page: FC, parent: Pages = null) {
        this.key = key;
        this.path = `${(parent?.path) ?? ""}${path}`;
        this.namePage = namePage;
        this.page = page;
    }

    public static Home = new Pages(KEY_PAGE.HOME, "/home", "Home", Home);
}

export const routes: IRoute[] = [
    {
        key: Pages.Home.key,
        path: Pages.Home.path,
        component: Pages.Home.page,
        name: Pages.Home.namePage,
        exact: true
    }
];
