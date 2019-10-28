"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var grid_core_1 = require("@ag-community/grid-core");
var WatermarkComp = /** @class */ (function (_super) {
    __extends(WatermarkComp, _super);
    function WatermarkComp() {
        return _super.call(this, "<div class=\"ag-watermark\">\n                    <div ref=\"eLicenseTextRef\" class=\"ag-watermark-text\"></div>\n               </div>") || this;
    }
    WatermarkComp.prototype.postConstruct = function () {
        var _this = this;
        var show = this.shouldDisplayWatermark();
        grid_core_1._.addOrRemoveCssClass(this.getGui(), 'ag-hidden', !show);
        if (show) {
            this.eLicenseTextRef.innerText = this.licenseManager.getWatermarkMessage();
            window.setTimeout(function () { return _this.addCssClass('ag-opacity-zero'); }, 0);
            window.setTimeout(function () { return _this.addCssClass('ag-hidden'); }, 5000);
        }
    };
    WatermarkComp.prototype.shouldDisplayWatermark = function () {
        var isDisplayWatermark = this.licenseManager.isDisplayWatermark();
        var isWhiteListURL = location.hostname.match('^127\.0\.0\.1|localhost|www\.ag-grid\.com$') != null;
        var isForceWatermark = location.search.indexOf('forceWatermark') !== -1;
        return isForceWatermark || (isDisplayWatermark && !isWhiteListURL);
    };
    __decorate([
        grid_core_1.Autowired('licenseManager')
    ], WatermarkComp.prototype, "licenseManager", void 0);
    __decorate([
        grid_core_1.RefSelector('eLicenseTextRef')
    ], WatermarkComp.prototype, "eLicenseTextRef", void 0);
    __decorate([
        grid_core_1.PostConstruct
    ], WatermarkComp.prototype, "postConstruct", null);
    return WatermarkComp;
}(grid_core_1.Component));
exports.WatermarkComp = WatermarkComp;