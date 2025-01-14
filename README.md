# International Telephone Input Power Apps Component
 PCF for international phone input with call link option and automatic phone call record creation.
 
 This is a modified version of the existing project <a href="https://github.com/rafaelbatista6/IntlTelInputPCF">IntlTelInputPCF</a>

 <img src="https://github.com/LynqdSolutions/IntTelInput_LYNQD/blob/main/images/preview.gif">

 Component can be applied on phone field attributes

**Important:** This component will store numbers in Dataverse columns in the format **+XXXXXXXXXX** without spaces. If you plan to add this control to an existing column containing data, it is important to realign the data to match this format. The behavior when opening a record where the phone number field does not match this format is unpredictable.


This PCF control has 4 static input elements that you can configure:

***defaultCC***: String text code that defines the ISO-2 country code corresponding to the default flag displayed for a new or empty number. Example value is 'fr' or 'gb'. Default value is 'us'.

***favoriteCC***: String text code that defines the list of ISO-2 country codes to appear as preferred countries at the top of the control. The order of codes is transposed to the order on the list. Example value: 'us,gb,fr,es'. Default value is empty.

***showValidationRule***: Enum with values 'Yes' or 'No'. When set to 'Yes', the control will validate the phone number format when updated by the user. If the value doesn't match the country format, the input is highlighted in red. Default value is 'No'.

***enableCallLink***: Enum with values 'Yes' or 'No'. When set to 'Yes', the control will add a tel: href to the phone number which allows you to directly call the number. Default value is 'No'.

<img src="https://github.com/LynqdSolutions/IntTelInput_LYNQD/blob/main/images/Screencapture.png">

## Libraries
This component uses the following library.
https://www.npmjs.com/package/intl-tel-input

## Installation
Follow this [article](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/component-framework-for-canvas-apps) to setup your enviornment and install the component [Solution Package](https://github.com/LynqdSolutions/IntTelInput_LYNQD/blob/main/releases/IntlTelInpuSolutionUpdate.zip).
