import { useTranslation } from "react-i18next";

import _ from "lodash";

import { signInFormHeader, signInFormSubtitle } from "@MELocalization/en";

import logo from "@MEAssets/logo.png";

const SigninScreenFormHeaderComponent = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-col items-center space-y-3 lg:hidden">
        <img src={logo} alt="Logo" className="h-14 w-14 sm:h-16 sm:w-16" />
      </div>

      {/* Heading */}
      <div className="space-y-1 text-center lg:text-left">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          {_.upperFirst(
            t("signInFormHeader", { defaultValue: signInFormHeader }),
          )}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          {_.upperFirst(
            t("signInFormSubtitle", { defaultValue: signInFormSubtitle }),
          )}
        </p>
      </div>
    </>
  );
};

export default SigninScreenFormHeaderComponent;
