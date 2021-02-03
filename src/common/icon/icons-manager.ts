import { IconsOptions } from "../config/icons-options";
import { Icon } from "./icon";

export class IconManager {
    public static Instance: IconManager;
    constructor(
        private readonly iconsOptions: IconsOptions,
    ) {
    }

    public getIcon(icon: Icons): Icon {
        switch (icon) {
            case Icons.WindowsAppIcon:
                return this.iconsOptions.WindowsAppIcon;
            case Icons.MacOsAppIcon:
                return this.iconsOptions.MacOsAppIcon;
            case Icons.CalculatorIcon:
                return this.iconsOptions.CalculatorIcon;
            case Icons.ErrorIcon:
                return this.iconsOptions.ErrorIcon;
            case Icons.NoSearchResultIcon:
                return this.iconsOptions.NoSearchResultIcon;
            case Icons.FileIcon:
                return this.iconsOptions.FileIcon;
            case Icons.FolderIcon:
                return this.iconsOptions.FolderIcon;
            case Icons.CalculatorIcon:
                return this.iconsOptions.CalculatorIcon;
            case Icons.UrlIcon:
                return this.iconsOptions.UrlIcon;
            case Icons.EmailIcon:
                return this.iconsOptions.EmailIcon;
            case Icons.CurrencyExchangeIcon:
                return this.iconsOptions.CurrencyExchangeIcon;
            case Icons.WorkflowIcon:
                return this.iconsOptions.WorkflowIcon;
            case Icons.TerminalIcon:
                return this.iconsOptions.TerminalIcon;
            case Icons.ShortcutIcon:
                return this.iconsOptions.ShortcutIcon;
            case Icons.WebSearchIcon:
                return this.iconsOptions.WebSearchIcon;
            case Icons.TranslatorIcon:
                return this.iconsOptions.TranslatorIcon;
            case Icons.DictionaryIcon:
                return this.iconsOptions.DictionaryIcon;
            case Icons.BookmarkIcon:
                return this.iconsOptions.BookmarkIcon;
            case Icons.WindowsOperatingSystemSettingIcon:
                return this.iconsOptions.WindowsOperatingSystemSettingIcon;
            case Icons.ControlPanelIcon:
                return this.iconsOptions.ControlPanelIcon;
            default:
                return this.iconsOptions.ShortcutIcon;
        }
    }
}

export enum Icons {
    WindowsAppIcon,
    MacOsAppIcon,
    ColorConverterIcon,
    ErrorIcon,
    NoSearchResultIcon,
    FileIcon,
    FolderIcon,
    CalculatorIcon,
    UrlIcon,
    EmailIcon,
    CurrencyExchangeIcon,
    WorkflowIcon,
    TerminalIcon,
    ShortcutIcon,
    WebSearchIcon,
    TranslatorIcon,
    DictionaryIcon,
    BookmarkIcon,
    WindowsOperatingSystemSettingIcon,
    ControlPanelIcon,
}