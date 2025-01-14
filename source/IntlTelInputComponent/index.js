/* eslint-disable */

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IntlTelInput = require("intl-tel-input");
var IntlTelInputComponent = /** @class */ (function () {
    /**
     * Empty constructor.
     */
    function IntlTelInputComponent() {
    }
    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    IntlTelInputComponent.prototype.init = function (context, notifyOutputChanged, state, container) {
        this._notifyOutputChanged = notifyOutputChanged;
        this._phoneInput = document.createElement('input');
        this._phoneInput.setAttribute('type', 'tel');
        this._phoneInput.className = "inputText";
        this._phoneInput.readOnly = context.mode.isControlDisabled;
        this._phoneInput.setAttribute(context.mode.isControlDisabled ? "disabled" : "enabled", "true");
        this._phoneInput.addEventListener('change', this.onPhoneChange.bind(this));
        //this._phoneInput.addEventListener("countrychange",this.onCountryChange.bind(this));
        container.appendChild(this._phoneInput);
        //this._intlTelInputPlugin = IntlTelInput(this._phoneInput, {});
        this._intlTelInputPlugin = IntlTelInput(this._phoneInput, {
            preferredCountries: ["ch", "fr", "de", "it", "at"],
            initialCountry: "ch",
        });
        window.intlTelInputGlobals.loadUtils('https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.1.0/js/utils.js');
        /*
        this._intlTelInputPlugin = IntlTelInput(this._phoneInput, {
            initialCountry: "ch",
            onlyCountries: ["ch","fr","de","it"]


          });


        // NOTICE: has to load the utils.js in this way, as this component is initialized after window.load event, then utils.js defined in utilsScript option couldn't be loaded as expected.
        window.intlTelInputGlobals.loadUtils('https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.1.0/js/utils.js');*/
    };
    IntlTelInputComponent.prototype.onPhoneChange = function (event) {
        if (!this._intlTelInputPlugin.isValidNumber()) {
            this._phoneInput.style.color = "red";
        }
        else {
            this._phoneInput.style.color = "black";
        }
        this._notifyOutputChanged();
    };
    IntlTelInputComponent.prototype.onCountryChange = function (event) {
        this._notifyOutputChanged();
    };
    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    IntlTelInputComponent.prototype.updateView = function (context) {
        this._intlTelInputPlugin.setNumber(context.parameters.Phone.raw);
    };
    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    IntlTelInputComponent.prototype.getOutputs = function () {
        return {
            Phone: this._intlTelInputPlugin.getNumber()
        };
    };
    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    IntlTelInputComponent.prototype.destroy = function () {
        // Add code to cleanup control if necessary
    };
    return IntlTelInputComponent;
}());
exports.IntlTelInputComponent = IntlTelInputComponent;
