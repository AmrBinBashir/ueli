import { SearchResultItem } from "../common/search-result-item";
import { PluginType } from "./plugin-type";
import { IconManager, Icons } from "../common/icon/icons-manager";
import { defaultIconsOptions } from "../common/config/icons-options";

export function getNoSearchResultsFoundResultItem(message: string, description?: string): SearchResultItem {
    return {
        description: description ? description : "",
        executionArgument: "",
        hideMainWindowAfterExecution: false,
        icon: IconManager.Instance?.getIcon(Icons.NoSearchResultIcon) || defaultIconsOptions.ErrorIcon,
        name: message,
        originPluginType: PluginType.None,
        searchable: [],
    };
}
