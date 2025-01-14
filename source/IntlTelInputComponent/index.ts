/* eslint-disable */

import { create } from "domain";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as IntlTelInput from 'intl-tel-input';

export class IntlTelInputComponent implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    // PCF framework delegate which will be assigned to this object which would be called whenever any update happens. 
    private _notifyOutputChanged: () => void;
    private _context: ComponentFramework.Context<IInputs>;

    private _phoneInputContainer: HTMLDivElement;
    private _phoneInput: HTMLInputElement;
    private _intlTelInputPlugin: IntlTelInput.Plugin;
    private _clickToCallButton: HTMLButtonElement;

    private _defaultCC: string;
    private _favoriteCC: string[]
    private _numbershowValidationRuleValue = "";

    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
        this._notifyOutputChanged = notifyOutputChanged;
        this._context = context;
        this._defaultCC = "";
        this._favoriteCC = [];
        this._numbershowValidationRuleValue = "";

        this._phoneInputContainer = document.createElement('div');
        this._phoneInputContainer.className = "phone-input-container";

        this._phoneInput = document.createElement('input');
        this._phoneInput.setAttribute('type', 'tel');
        this._phoneInput.className = "inputText";
        this._phoneInput.readOnly = context.mode.isControlDisabled;
        this._phoneInput.setAttribute(context.mode.isControlDisabled ? "disabled" : "enabled", "true");
        this._phoneInput.addEventListener('change', this.onPhoneChange.bind(this));

        this._clickToCallButton = document.createElement("button");
        this._clickToCallButton.className = "click-to-call-button";
        this._clickToCallButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
            </svg>
        `; // Unicode for phone icon

        var enableCallLink = context.parameters.enableCallLink?.raw;

        this._clickToCallButton.onclick = () => {
            if (enableCallLink == "Yes") { window.open(`tel:${this._intlTelInputPlugin.getNumber()}`, "_blank") };
            const customEvent = new CustomEvent("clickToCall", {
                detail: this._intlTelInputPlugin.getNumber()
            });
            window.dispatchEvent(customEvent);
        };

        this.toggleClickToCallButton();

        this._phoneInputContainer.appendChild(this._phoneInput);
        this._phoneInputContainer.appendChild(this._clickToCallButton);
        container.appendChild(this._phoneInputContainer);

        if (context.parameters.defaultCC?.raw && context.parameters.defaultCC.raw !== null && context.parameters.defaultCC.raw !== "" && context.parameters.defaultCC.raw.indexOf(',') === -1) {
            this._defaultCC = context.parameters.defaultCC.raw.trim().toLowerCase();
        }

        if (context.parameters.favoriteCC?.raw && context.parameters.favoriteCC.raw !== null && context.parameters.favoriteCC.raw !== "") {
            this._favoriteCC = context.parameters.favoriteCC.raw.split(',');
            this._favoriteCC = this._favoriteCC.map(el => el.trim().toLowerCase());
        }

        this._numbershowValidationRuleValue = context.parameters.showValidationRule?.raw;

        this._intlTelInputPlugin = IntlTelInput(this._phoneInput, {
            preferredCountries: this._favoriteCC,
            initialCountry: this._defaultCC,

        });
        window.intlTelInputGlobals.loadUtils('https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.1.0/js/utils.js');

    }

	private onPhoneChange(event: Event): void {
		if(this._numbershowValidationRuleValue == "Yes")
		{
			if(!this._intlTelInputPlugin.isValidNumber())
				{
					this._phoneInput.style.color = "red";
					this._notifyOutputChanged();
        			this.toggleClickToCallButton();
				}
				else
				{
					this._phoneInput.style.color = "black";
				}
		}

		this._notifyOutputChanged();
	}

	private onCountryChange(event: Event): void {
		this._notifyOutputChanged();
	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		this._intlTelInputPlugin.setNumber(context.parameters.Phone.raw!);
        this.toggleClickToCallButton();
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */

    private toggleClickToCallButton(): void {
        if (this._phoneInput.value.trim() === "" || !this._intlTelInputPlugin.isValidNumber()) {
            this._clickToCallButton.disabled = true;
        } else {
            this._clickToCallButton.disabled = false;
        }
    }


    public getOutputs(): IOutputs {
        return {
            Phone: this._intlTelInputPlugin.getNumber()
        };
    }

    public destroy(): void {
        // Cleanup if necessary
    }
}