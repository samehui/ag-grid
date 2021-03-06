import { PieSeriesOptions, PolarChartOptions } from "@ag-grid-community/core";
import { ChartProxyParams, UpdateChartParams } from "../chartProxy";
import { PolarChartProxy } from "./polarChartProxy";
import { PolarChart } from "../../../../charts/chart/polarChart";
export declare class PieChartProxy extends PolarChartProxy {
    constructor(params: ChartProxyParams);
    protected createChart(options: PolarChartOptions<PieSeriesOptions>): PolarChart;
    update(params: UpdateChartParams): void;
    protected getDefaultOptions(): PolarChartOptions<PieSeriesOptions>;
}
