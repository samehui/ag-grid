// ag-grid-enterprise v21.0.1
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var ag_grid_community_1 = require("ag-grid-community");
var clipboardService_1 = require("../clipboardService");
var aggFuncService_1 = require("../aggregation/aggFuncService");
var MenuItemMapper = /** @class */ (function () {
    function MenuItemMapper() {
    }
    MenuItemMapper.prototype.mapWithStockItems = function (originalList, column) {
        var _this = this;
        if (!originalList) {
            return [];
        }
        var resultList = [];
        originalList.forEach(function (menuItemOrString) {
            var result;
            if (typeof menuItemOrString === 'string') {
                result = _this.getStockMenuItem(menuItemOrString, column);
            }
            else {
                result = menuItemOrString;
            }
            if (result.subMenu) {
                var resultDef = result;
                resultDef.subMenu = _this.mapWithStockItems(resultDef.subMenu, column);
            }
            if (result != null) {
                resultList.push(result);
            }
        });
        return resultList;
    };
    MenuItemMapper.prototype.getStockMenuItem = function (key, column) {
        var _this = this;
        var localeTextFunc = this.gridOptionsWrapper.getLocaleTextFunc();
        switch (key) {
            case 'pinSubMenu':
                return {
                    name: localeTextFunc('pinColumn', 'Pin Column'),
                    icon: ag_grid_community_1.Utils.createIconNoSpan('menuPin', this.gridOptionsWrapper, null),
                    subMenu: ['pinLeft', 'pinRight', 'clearPinned']
                };
            case 'pinLeft':
                return {
                    name: localeTextFunc('pinLeft', 'Pin Left'),
                    action: function () { return _this.columnController.setColumnPinned(column, ag_grid_community_1.Column.PINNED_LEFT, "contextMenu"); },
                    checked: column.isPinnedLeft()
                };
            case 'pinRight':
                return {
                    name: localeTextFunc('pinRight', 'Pin Right'),
                    action: function () { return _this.columnController.setColumnPinned(column, ag_grid_community_1.Column.PINNED_RIGHT, "contextMenu"); },
                    checked: column.isPinnedRight()
                };
            case 'clearPinned':
                return {
                    name: localeTextFunc('noPin', 'No Pin'),
                    action: function () { return _this.columnController.setColumnPinned(column, null, "contextMenu"); },
                    checked: !column.isPinned()
                };
            case 'valueAggSubMenu':
                return {
                    name: localeTextFunc('valueAggregation', 'Value Aggregation'),
                    icon: ag_grid_community_1.Utils.createIconNoSpan('menuValue', this.gridOptionsWrapper, null),
                    subMenu: this.createAggregationSubMenu(column)
                };
            case 'autoSizeThis':
                return {
                    name: localeTextFunc('autosizeThiscolumn', 'Autosize This Column'),
                    action: function () { return _this.columnController.autoSizeColumn(column, "contextMenu"); }
                };
            case 'autoSizeAll':
                return {
                    name: localeTextFunc('autosizeAllColumns', 'Autosize All Columns'),
                    action: function () { return _this.columnController.autoSizeAllColumns("contextMenu"); }
                };
            case 'rowGroup':
                return {
                    name: localeTextFunc('groupBy', 'Group by') + ' ' + ag_grid_community_1._.escape(this.columnController.getDisplayNameForColumn(column, 'header')),
                    action: function () { return _this.columnController.addRowGroupColumn(column, "contextMenu"); },
                    icon: ag_grid_community_1.Utils.createIconNoSpan('menuAddRowGroup', this.gridOptionsWrapper, null)
                };
            case 'rowUnGroup':
                return {
                    name: localeTextFunc('ungroupBy', 'Un-Group by') + ' ' + ag_grid_community_1._.escape(this.columnController.getDisplayNameForColumn(column, 'header')),
                    action: function () { return _this.columnController.removeRowGroupColumn(column, "contextMenu"); },
                    icon: ag_grid_community_1.Utils.createIconNoSpan('menuRemoveRowGroup', this.gridOptionsWrapper, null)
                };
            case 'resetColumns':
                return {
                    name: localeTextFunc('resetColumns', 'Reset Columns'),
                    action: function () { return _this.columnController.resetColumnState(false, "contextMenu"); }
                };
            case 'expandAll':
                return {
                    name: localeTextFunc('expandAll', 'Expand All'),
                    action: function () { return _this.gridApi.expandAll(); }
                };
            case 'contractAll':
                return {
                    name: localeTextFunc('collapseAll', 'Collapse All'),
                    action: function () { return _this.gridApi.collapseAll(); }
                };
            case 'copy':
                return {
                    name: localeTextFunc('copy', 'Copy'),
                    shortcut: localeTextFunc('ctrlC', 'Ctrl+C'),
                    icon: ag_grid_community_1.Utils.createIconNoSpan('clipboardCopy', this.gridOptionsWrapper, null),
                    action: function () { return _this.clipboardService.copyToClipboard(false); }
                };
            case 'copyWithHeaders':
                return {
                    name: localeTextFunc('copyWithHeaders', 'Copy with Headers'),
                    // shortcut: localeTextFunc('ctrlC','Ctrl+C'),
                    icon: ag_grid_community_1.Utils.createIconNoSpan('clipboardCopy', this.gridOptionsWrapper, null),
                    action: function () { return _this.clipboardService.copyToClipboard(true); }
                };
            case 'paste':
                return {
                    name: localeTextFunc('paste', 'Paste'),
                    shortcut: localeTextFunc('ctrlV', 'Ctrl+V'),
                    disabled: true,
                    icon: ag_grid_community_1.Utils.createIconNoSpan('clipboardPaste', this.gridOptionsWrapper, null),
                    action: function () { return _this.clipboardService.pasteFromClipboard(); }
                };
            case 'export':
                var exportSubMenuItems = [];
                if (!this.gridOptionsWrapper.isSuppressCsvExport()) {
                    exportSubMenuItems.push('csvExport');
                }
                if (!this.gridOptionsWrapper.isSuppressExcelExport()) {
                    exportSubMenuItems.push('excelExport');
                    exportSubMenuItems.push('excelXmlExport');
                }
                return {
                    name: localeTextFunc('export', 'Export'),
                    subMenu: exportSubMenuItems
                };
            case 'csvExport':
                return {
                    name: localeTextFunc('csvExport', 'CSV Export'),
                    action: function () { return _this.gridApi.exportDataAsCsv({}); }
                };
            case 'excelExport':
                return {
                    name: localeTextFunc('excelExport', 'Excel Export (.xlsx)&lrm;'),
                    action: function () { return _this.gridApi.exportDataAsExcel({
                        exportMode: 'xlsx'
                    }); }
                };
            case 'excelXmlExport':
                return {
                    name: localeTextFunc('excelXmlExport', 'Excel Export (.xml)&lrm;'),
                    action: function () { return _this.gridApi.exportDataAsExcel({
                        exportMode: 'xml'
                    }); }
                };
            case 'separator':
                return 'separator';
            case 'chartRange':
                var chartRangeSubMenuItems = [];
                chartRangeSubMenuItems.push('groupedBarRangeChart');
                chartRangeSubMenuItems.push('stackedBarRangeChart');
                chartRangeSubMenuItems.push('lineRangeChart');
                chartRangeSubMenuItems.push('pieRangeChart');
                chartRangeSubMenuItems.push('doughnutRangeChart');
                return {
                    name: 'Chart Range',
                    subMenu: chartRangeSubMenuItems
                };
            case 'groupedBarRangeChart': return {
                name: localeTextFunc('groupedBarRangeChart', 'Bar (Grouped)'),
                action: function () {
                    _this.rangeChartService.chartCurrentRange(ag_grid_community_1.ChartType.GroupedBar);
                }
            };
            case 'stackedBarRangeChart': return {
                name: localeTextFunc('stackedBarRangeChart', 'Bar (Stacked)'),
                action: function () {
                    _this.rangeChartService.chartCurrentRange(ag_grid_community_1.ChartType.StackedBar);
                }
            };
            case 'lineRangeChart': return {
                name: localeTextFunc('lineRangeChart', 'Line'),
                action: function () {
                    _this.rangeChartService.chartCurrentRange(ag_grid_community_1.ChartType.Line);
                }
            };
            case 'pieRangeChart': return {
                name: localeTextFunc('pieRangeChart', 'Pie'),
                action: function () {
                    _this.rangeChartService.chartCurrentRange(ag_grid_community_1.ChartType.Pie);
                }
            };
            case 'doughnutRangeChart': return {
                name: localeTextFunc('doughnutRangeChart', 'Doughnut'),
                action: function () {
                    _this.rangeChartService.chartCurrentRange(ag_grid_community_1.ChartType.Doughnut);
                }
            };
            default:
                console.warn("ag-Grid: unknown menu item type " + key);
                return null;
        }
    };
    MenuItemMapper.prototype.createAggregationSubMenu = function (column) {
        var _this = this;
        var localeTextFunc = this.gridOptionsWrapper.getLocaleTextFunc();
        var columnIsAlreadyAggValue = column.isValueActive();
        var funcNames = this.aggFuncService.getFuncNames(column);
        var columnToUse;
        if (column.isPrimary()) {
            columnToUse = column;
        }
        else {
            var pivotValueColumn = column.getColDef().pivotValueColumn;
            columnToUse = ag_grid_community_1._.exists(pivotValueColumn) ? pivotValueColumn : undefined;
        }
        var result = [];
        funcNames.forEach(function (funcName) {
            result.push({
                name: localeTextFunc(funcName, funcName),
                action: function () {
                    _this.columnController.setColumnAggFunc(columnToUse, funcName, "contextMenu");
                    _this.columnController.addValueColumn(columnToUse, "contextMenu");
                },
                checked: columnIsAlreadyAggValue && columnToUse.getAggFunc() === funcName
            });
        });
        return result;
    };
    __decorate([
        ag_grid_community_1.Autowired('gridOptionsWrapper'),
        __metadata("design:type", ag_grid_community_1.GridOptionsWrapper)
    ], MenuItemMapper.prototype, "gridOptionsWrapper", void 0);
    __decorate([
        ag_grid_community_1.Autowired('columnController'),
        __metadata("design:type", ag_grid_community_1.ColumnController)
    ], MenuItemMapper.prototype, "columnController", void 0);
    __decorate([
        ag_grid_community_1.Autowired('gridApi'),
        __metadata("design:type", ag_grid_community_1.GridApi)
    ], MenuItemMapper.prototype, "gridApi", void 0);
    __decorate([
        ag_grid_community_1.Autowired('clipboardService'),
        __metadata("design:type", clipboardService_1.ClipboardService)
    ], MenuItemMapper.prototype, "clipboardService", void 0);
    __decorate([
        ag_grid_community_1.Autowired('aggFuncService'),
        __metadata("design:type", aggFuncService_1.AggFuncService)
    ], MenuItemMapper.prototype, "aggFuncService", void 0);
    __decorate([
        ag_grid_community_1.Optional('rangeChartService'),
        __metadata("design:type", Object)
    ], MenuItemMapper.prototype, "rangeChartService", void 0);
    MenuItemMapper = __decorate([
        ag_grid_community_1.Bean('menuItemMapper')
    ], MenuItemMapper);
    return MenuItemMapper;
}());
exports.MenuItemMapper = MenuItemMapper;
