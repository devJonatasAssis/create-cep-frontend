import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ListCeps from "./pages/ListCeps";
import NovoCep from "./pages/NovoCep";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/ceps" component={ListCeps} />
                <Route path="/cep/novo" component={NovoCep} />
            </Switch>
        </BrowserRouter>
    );
}
