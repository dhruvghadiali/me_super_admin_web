import _ from "lodash";

import SigninScreenFormComponent from "@MEScreenComponents/signin/form";
import SigninScreenLeftPanelBrandingComponent from "@MEScreenComponents/signin/leftPanelBranding";

const SigninScreenComponent = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left panel — branding (hidden on mobile/tablet) */}
      <SigninScreenLeftPanelBrandingComponent />
      
      {/* Right panel — sign in form */}
      <SigninScreenFormComponent />
    </div>
  );
};

export default SigninScreenComponent;
