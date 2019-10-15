import {Module, ModuleNames, ModuleRegistry} from "ag-grid-community";
import {HorizontalResizeComp} from "./sideBar/horizontalResizeComp";
import {SideBarComp} from "./sideBar/sideBarComp";
import {SideBarButtonsComp} from "./sideBar/sideBarButtonsComp";
import {ToolPanelColDefService} from "./sideBar/common/toolPanelColDefService";

export const SideBarModule: Module = {
    moduleName: ModuleNames.SideBarModule,
    beans: [ToolPanelColDefService],
    agStackComponents: [
        {componentName: 'AgHorizontalResize', componentClass: HorizontalResizeComp},
        {componentName: 'AgSideBar', componentClass: SideBarComp},
        {componentName: 'AgSideBarButtons', componentClass: SideBarButtonsComp},
    ]
};

ModuleRegistry.register(SideBarModule);