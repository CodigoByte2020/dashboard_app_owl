/** @odoo-module **/

import { loadJS} from "@web/core/assets";
import { Component, useState, onWillStart, useRef, onMounted } from "@odoo/owl";

export class OwlChartRenderer extends Component {
    setup() {
        this.state = useState({
            title: this.props.title,
            data: this.props.data,
            type: this.props.type
        });
        this.chartRef = useRef("chart"); //It allows you to access and manipulate elements of the DOM

        onWillStart(async () => {
            await loadJS("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.5.0/chart.umd.js");
        })

        onMounted(() => {
            console.log("Chart Renderer Mounted");
            console.log("data", this.state.data);
            const labels = [];
            const metrics = [];
            this.state.data.map((item) => {
                labels.push(item.state);
                metrics.push(item.state_count);
            })
            this.render(this.state.title, labels, metrics, this.state.type);
        })
    }

    render(title, labels, metrics, type='pie') {
        return new Chart(this.chartRef.el, {
            type: type,
            data: {
                labels: labels,
                datasets: [{
                    label: title,
                    data: metrics
                }]
            }
        });
    }    
}
OwlChartRenderer.template = "owl.OwlChartRenderer";
