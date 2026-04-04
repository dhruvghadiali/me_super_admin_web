import { AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

import _ from "lodash";

import { Card, CardContent } from "@MEShadcnComponents/card";
import {
  pageDetailsNotFoundFooter,
  pageDetailsNotFoundDefaultTitle,
  pageDetailsNotFoundDefaultErrorCode,
  pageDetailsNotFoundDefaultMessage,
} from "@MELocalization/en";

const MEPageDetailsNotFoundComponent = (props) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg border border-border bg-primary">
      <CardContent className="flex flex-col items-center justify-center p-8 sm:p-12 text-center space-y-6">
        <div className="relative mb-4">
            <div className="relative bg-secondary rounded-full p-3 border-2 border-primary">
              <AlertCircle className="h-10 w-10 sm:h-14 sm:w-14 text-destructive" />
            </div>
          </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary">
              {t("pageDetailsNotFoundDefaultErrorCode", {
                defaultValue: pageDetailsNotFoundDefaultErrorCode,
              })}
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-secondary">
              {_.upperFirst(
                t("pageDetailsNotFoundDefaultTitle", {
                  defaultValue: pageDetailsNotFoundDefaultTitle,
                }),
              )}
            </h2>
          </div>

          <p className="text-sm sm:text-base text-secondary leading-relaxed max-w-md mx-auto">
            {t("pageDetailsNotFoundDefaultMessage", {
              defaultValue: pageDetailsNotFoundDefaultMessage,
            })}
          </p>
        </div>

        <div className="w-full border-t border-secondary" />

        <div className="pt-2">
          <p className="text-xs text-secondary italic">
            {_.upperFirst(
              t("pageDetailsNotFoundFooter", {
                defaultValue: pageDetailsNotFoundFooter,
              }),
            )}
          </p>
        </div>
      </CardContent>
    </Card>
    </div>
  );
};

export default MEPageDetailsNotFoundComponent;
