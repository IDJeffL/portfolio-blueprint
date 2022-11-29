import { _Hooks } from '@wordpress/hooks/build-types/createHooks';
export interface Plugin {
    apply?: (hooks: _Hooks) => void;
}
export declare const hooks: _Hooks;
