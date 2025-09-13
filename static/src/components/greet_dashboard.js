/** @odoo-module **/

import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { Component, useState, onWillStart } from "@odoo/owl";

export class GreetDashboard extends Component {
    setup() {
        this.state = useState({
            title: "",
            information: []
        })
        this.orm = useService("orm");

        onWillStart(async () => {
            console.log("onWillStart");
            this.state.title = "Greetings Dashboard";
            console.log("this.state.title", this.state.title);
            this.state.information = await this.getModuleInformation();
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
}

GreetDashboard.template = "dashboard.GreetDashboard";
registry.category("actions").add("dashboard.greet_dashboard", GreetDashboard);
