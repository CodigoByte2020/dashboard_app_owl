/** @odoo-module **/

import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { Component, useState, onWillStart } from "@odoo/owl";
import { OwlChartRenderer } from "./chart/chart_renderer";

export class GreetDashboard extends Component {
    setup() {
        this.state = useState({
            title: "",
            information: [],
            countModules: []
        })
        this.orm = useService("orm");

        onWillStart(async () => {
            console.log("onWillStart");
            this.state.title = "Greetings Dashboard";
            console.log("this.state.title", this.state.title);
            this.state.information = await this.getModuleInformation();
            this.state.countModules = await this.getCountModules();
        })
    }

    async getModuleInformation() {
        const information = await this.orm.searchRead(
            "ir.module.module", 
            [["name", "in", ["dashboard", "web", "base"]]],
            ["description", "author", "website"]
        );
        console.log("information", information);
        return information;
    }

    async getCountModules() {
        const countModules = await this.orm.readGroup(
            "ir.module.module",
            [],
            ["state"],
            ["state"]
        );
        console.log("countModules", countModules);
        return countModules;
    }
}

GreetDashboard.template = "dashboard.GreetDashboard";  // Register the template
GreetDashboard.components = { OwlChartRenderer };  // Register the OWL component
registry.category("actions").add("dashboard.greet_dashboard", GreetDashboard);
