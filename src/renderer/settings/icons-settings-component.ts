import Vue from "vue";
import { vueEventDispatcher } from "../vue-event-dispatcher";
import { VueEventChannels } from "../vue-event-channels";
import { UserConfigOptions } from "../../common/config/user-config-options";
import { GeneralSettings } from "./general-settings";
import { UserConfirmationDialogParams, UserConfirmationDialogType } from "./modals/user-confirmation-dialog-params";
import { TranslationSet } from "../../common/translation/translation-set";
import { deepCopy } from "../../common/helpers/object-helpers";
import { defaultIconsOptions } from "../../common/config/icons-options";


export const iconsSettingsComponent = Vue.extend({
    data() {
        return {
            settingName: GeneralSettings.Icons,
            visible: false,
        };
    },
    methods: {
        resetAll() {
            const translations: TranslationSet = this.translations;
            const userConfirmationDialogParams: UserConfirmationDialogParams = {
                callback: () => {
                    const config: UserConfigOptions = this.config;
                    config.iconsOptions = deepCopy(defaultIconsOptions);
                    this.updateConfig();
                },
                message: translations.iconsSettingsResetWarningMessage,
                modalTitle: translations.resetToDefault,
                type: UserConfirmationDialogType.Default,
            };
            vueEventDispatcher.$emit(VueEventChannels.settingsConfirmation, userConfirmationDialogParams);
        },
        updateConfig() {
            vueEventDispatcher.$emit(VueEventChannels.configUpdated, this.config);
        },
    },
    mounted() {
        vueEventDispatcher.$on(VueEventChannels.showSetting, (settingName: string) => {
            if (settingName === this.settingName) {
                this.visible = true;
            } else {
                this.visible = false;
            }
        });
    },
    watch: {
        config() {
            this.updateConfig();
        }
    },
    props: ["config", "translations"],
    template: `
    <div v-if="visible">
        <div class="settings__setting-title title is-3">
            <span>
                {{translations.iconsSettings}}
            </span>
            <button class="button" @click="resetAll">
                <span class="icon"><i class="fas fa-undo-alt"></i></span>
            </button>
        </div>
        <div class="settings__setting-content">
            <div class="box" v-for="(icon, iconName) in config.iconsOptions">
                <div class="settings__options-container">
                <div class="settings__setting-content-item-title mb-4">
                        <div class="title is-5">
                            {{ iconName }}
                        </div>
                </div>
                <icon-editing :icon="icon" :translations="translations" @change="updateConfig"></icon-editing>
                </div class="settings__options-container">
            </div>
        </div>
    </div>
    `,
});
