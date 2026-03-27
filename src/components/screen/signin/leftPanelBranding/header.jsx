import { useTranslation } from "react-i18next";

import _ from "lodash";

import {
  signInLogoName,
  signInHeader,
  signInSubtitle,
} from "@MELocalization/en";

import logo from "@MEAssets/logo.png";

const SigninScreenLeftPanelBrandingHeaderComponent = () => {
  const { t } = useTranslation();

  return (
    <div className="hidden lg:flex flex-col items-center justify-center bg-primary p-10">
      <img
        src={logo}
        alt="Logo"
        className="h-24 w-24 xl:h-32 xl:w-32 mb-6 rounded-2xl shadow-lg"
      />
      <h2 className="text-3xl xl:text-4xl font-bold text-primary-foreground tracking-tight">
        {`${_.upperCase(t("signInLogoName", { defaultValue: signInLogoName }))} ${_.upperCase(t("signInHeader", { defaultValue: signInHeader }))}`}
      </h2>
      <p className="mt-2 text-primary-foreground/70 text-base xl:text-lg text-center max-w-sm">
        {_.upperFirst(t("signInSubtitle", { defaultValue: signInSubtitle }))}
      </p>
    </div>
  );
};

export default SigninScreenLeftPanelBrandingHeaderComponent;
