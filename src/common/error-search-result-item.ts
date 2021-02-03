import { SearchResultItem } from "./search-result-item";
import { PluginType } from "../main/plugin-type";
import { IconManager, Icons } from "./icon/icons-manager";

export function getErrorSearchResultItem(name: string, description?: string): SearchResultItem {
    return {
        description: description ? description : "",
        executionArgument: "",
        hideMainWindowAfterExecution: false,
        icon: IconManager.Instance.getIcon(Icons.ErrorIcon),
        name,
        originPluginType: PluginType.None,
        searchable: [],
    };
}
