import * as vue from 'vue';
import { Vue } from 'vue-property-decorator';

declare class AButton extends Vue {
    private size;
    private type;
    private round;
    private disabled;
    get btnClass(): {
        "a-button": boolean;
        "a-button-primary": boolean;
        "a-button-secondary": boolean;
        "a-button-text-secondary": boolean;
        "a-button-round": boolean;
        "a-button-disabled": boolean;
        "a-button-size": string;
    };
}

declare const _default: {
    install: (Vue: any) => void;
    AButton: vue.VueConstructor<AButton>;
};

export { _default as default };
