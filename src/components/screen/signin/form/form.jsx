import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";
import * as Yup from "yup";

import { Button } from "@MEShadcnComponents/button";
import { Spinner } from "@MEShadcnComponents/spinner";
import { setSigninPayload } from "@MEUtils/apiPayload/authPayload";
import { signIn } from "@MERedux/authentication/authenticationAction";
import {
  passwordRequired,
  passwordMaxLength,
  passwordMinLength,
  usernameRequired,
  usernameMaxLength,
  usernameMinLength,
} from "@MEUtils/validationMessage";
import {
  authPasswordMaxChar,
  authPasswordMinChar,
  authUsernameMaxChar,
  authUsernameMinChar,
} from "@MEUtils/validationConst";
import {
  signInFormUsernameId,
  signInFormUsernameName,
  signInFormUsernameLabel,
  signInFormUsernameAutoComplete,
  signInFormUsernamePlaceholder,
  signInFormPasswordId,
  signInFormPasswordName,
  signInFormPasswordLabel,
  signInFormPasswordAutoComplete,
  signInFormPasswordPlaceholder,
  signInFormSubmitButtonLabel,
} from "@MELocalization/en";

import MEInputComponent from "@MECommonComponents/form/meInput";
import MEPasswordInputComponent from "@MECommonComponents/form/mePasswordInput";

const SigninScreenAuthFormComponent = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { loader, error } = useSelector((state) => state.authentication);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(signIn(setSigninPayload(values)));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-md bg-destructive/10 border border-destructive/20 px-3 py-2">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <MEInputComponent
        id={t("signInFormUsernameId", {
          defaultValue: signInFormUsernameId,
        })}
        name={t("signInFormUsernameName", {
          defaultValue: signInFormUsernameName,
        })}
        label={_.upperFirst(
          t("signInFormUsernameLabel", {
            defaultValue: signInFormUsernameLabel,
          }),
        )}
        placeholder={_.upperFirst(
          t("signInFormUsernamePlaceholder", {
            defaultValue: signInFormUsernamePlaceholder,
          }),
        )}
        autoComplete={t("signInFormUsernameAutoComplete", {
          defaultValue: signInFormUsernameAutoComplete,
        })}
        errorMessage={
          formik.touched.username && formik.errors.username
            ? formik.errors.username
            : ""
        }
        value={formik.values.username}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />

      <MEPasswordInputComponent
        id={t("signInFormPasswordId", {
          defaultValue: signInFormPasswordId,
        })}
        name={t("signInFormPasswordName", {
          defaultValue: signInFormPasswordName,
        })}
        label={_.upperFirst(
          t("signInFormPasswordLabel", {
            defaultValue: signInFormPasswordLabel,
          }),
        )}
        placeholder={_.upperFirst(
          t("signInFormPasswordPlaceholder", {
            defaultValue: signInFormPasswordPlaceholder,
          }),
        )}
        autoComplete={t("signInFormPasswordAutoComplete", {
          defaultValue: signInFormPasswordAutoComplete,
        })}
        errorMessage={
          formik.touched.password && formik.errors.password
            ? formik.errors.password
            : ""
        }
        value={formik.values.password}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />

      <Button
        type="submit"
        className="w-full text-sm sm:text-base font-medium bg-success hover:bg-success/90 hover:cursor-pointer"
        disabled={loader}
      >
        {_.startCase(
          t("signInFormSubmitButtonLabel", {
            defaultValue: signInFormSubmitButtonLabel,
          }),
        )}
        {loader && <Spinner />}
      </Button>
    </form>
  );
};

const validationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .min(authUsernameMinChar, usernameMinLength)
    .max(authUsernameMaxChar, usernameMaxLength)
    .required(usernameRequired),
  password: Yup.string()
    .trim()
    .min(authPasswordMinChar, passwordMinLength)
    .max(authPasswordMaxChar, passwordMaxLength)
    .required(passwordRequired),
});

export default SigninScreenAuthFormComponent;
