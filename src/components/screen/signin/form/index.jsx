import _ from "lodash";

import SigninScreenAuthFormComponent from "@MEScreenComponents/signin/form/form";
import SigninScreenFormHeaderComponent from "@MEScreenComponents/signin/form/header";

const SigninScreenFormComponent = () => {
  return (
    <div className="flex items-center justify-center bg-background px-4 py-8 sm:px-8">
      <div className="w-full max-w-100 space-y-8">
        <SigninScreenFormHeaderComponent />
        <SigninScreenAuthFormComponent />
      </div>
    </div>
  );
};

export default SigninScreenFormComponent;
