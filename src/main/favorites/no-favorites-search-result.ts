import { SearchResultItem } from "../../common/search-result-item";
import { PluginType } from "../plugin-type";
import { TranslationSet } from "../../common/translation/translation-set";
import { IconManager, Icons } from "../../common/icon/icons-manager";

export function getNoFavoritesSearchResult(translationSet: TranslationSet): SearchResultItem {
    return {
        description: translationSet.noFavoritesFoundDescription,
        executionArgument: "",
        hideMainWindowAfterExecution: true,
        icon: IconManager.Instance.getIcon(Icons.NoSearchResultIcon),
        name: translationSet.noFavoritesFoundTitle,
        originPluginType: PluginType.None,
        searchable: [],
    };
}
