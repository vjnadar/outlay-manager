import "./ButtonFactory.scss";

import { ReactNode } from "react";

import { ButtonTypes } from "./enums";
import { ButtonFactoryProps } from "./types";

function ButtonFactory({ buttonSpecs, secondButton, resetForm }: ButtonFactoryProps): JSX.Element {
    let button = null;
    const secondaryButton = secondButton ?? resetForm;
    switch (buttonSpecs.buttonSet.setType) {
        case ButtonTypes.Default: {
            button = (
                <>
                    <button className="submit-button" type="submit">
                        {buttonSpecs.buttonSet.buttonNames.ok}
                    </button>
                    <button
                        className="button"
                        type="button"
                        onClick={() => {
                            secondaryButton();
                        }}
                    >
                        {buttonSpecs.buttonSet.buttonNames.cancel}
                    </button>
                </>
            );
            break;
        }
        case ButtonTypes.Reverse: {
            button = (
                <>
                    <button
                        className="button"
                        type="button"
                        onClick={() => {
                            secondaryButton();
                        }}
                    >
                        {buttonSpecs.buttonSet.buttonNames.cancel}
                    </button>
                    <button className="submit-button" type="submit">
                        {buttonSpecs.buttonSet.buttonNames.ok}
                    </button>
                </>
            );
            break;
        }
        default: {
            button = null;
            console.log("Invalid form");
            break;
        }
    }
    /* eslint-disable */
    return <>{button}</>;
}
export default ButtonFactory;
