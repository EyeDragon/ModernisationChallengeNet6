import { toDataUrl, urlImage } from "@utils/function-data";
import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { routes, Pages } from "./routes";

import "@assets/css/StyleSheet.css";

const App: FC = () => {
    return <>
        <div>
            <Switch>
                {
                    routes.map((x, i) =>
                    (<Route
                        key={i}
                        path={x.path}
                        exact={x.exact}
                        component={x.component}
                    />))
                }
                <Redirect from="/" to={Pages.Home.path} />
            </Switch>
        </div>
    </>;
};

export default App;