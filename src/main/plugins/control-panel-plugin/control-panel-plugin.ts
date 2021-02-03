import { SearchResultItem } from "../../../common/search-result-item";
import { PluginType } from "../../plugin-type";
import { IconType } from "../../../common/icon/icon-type";
import { TranslationSet } from "../../../common/translation/translation-set";
import { UserConfigOptions } from "../../../common/config/user-config-options";
import { SearchPlugin } from "../../search-plugin";
import { ControlPanelOptions } from "../../../common/config/control-panel-options";
import { ControlPanelItem } from "./control-panel-item";
import { ControlPanelItemsRetriever } from "./control-panel-items-retriever";
import { executeCommand } from "../../executors/command-executor";
import { IconManager, Icons } from "../../../common/icon/icons-manager";

export class ControlPanelPlugin implements SearchPlugin {
    public pluginType = PluginType.ControlPanel;
    private controlPanelItems: ControlPanelItem[];
    private config: ControlPanelOptions;

    constructor(config: ControlPanelOptions) {
        this.config = config;
        this.controlPanelItems = [];
    }

    public isEnabled(): boolean {
        return this.config.isEnabled;
    }

    public execute(searchResultItem: SearchResultItem, privileged: boolean): Promise<void> {
        return new Promise((resolve, reject) => {
            executeCommand(`powershell -NonInteractive -NoProfile -Command "Show-ControlPanelItem -Name '${searchResultItem.executionArgument}'"`)
                .then(() => resolve())
                .catch((reason) => reject(reason));
        });
    }

    public updateConfig(updatedConfig: UserConfigOptions, translationSet: TranslationSet): Promise<void> {
        return new Promise((resolve) => {
            this.config = updatedConfig.controlPanelOptions;
            resolve();
        });
    }

    public getAll(): Promise<SearchResultItem[]> {
        return new Promise((resolve) => {
            const searchResultItems = this.controlPanelItems.map((item) => ({
                description: item.Description,
                executionArgument: item.Name,
                hideMainWindowAfterExecution: true,
                icon: item.IconBase64 ? { parameter: `data:image/png;base64,${item.IconBase64}`, type: IconType.URL } : IconManager.Instance.getIcon(Icons.ControlPanelIcon),
                name: item.Name,
                needsUserConfirmationBeforeExecution: false,
                originPluginType: PluginType.ControlPanel,
                searchable: [item.Name, item.Description],
                supportsAutocompletion: false,
                supportsOpenLocation: false,
            }));
            resolve(searchResultItems);
        });
    }

    public refreshIndex(): Promise<void> {
        return new Promise((resolve, reject) => {
            ControlPanelItemsRetriever.RetrieveControlPanelItems(this.controlPanelItems)
                .then((controlPanelItems) => {
                    this.controlPanelItems = controlPanelItems;
                    resolve();
                })
                .catch((resaon) => reject(resaon));
        });
    }

    public clearCache(): Promise<void> {
        return new Promise((resolve) => {
            resolve();
        });
    }
}
