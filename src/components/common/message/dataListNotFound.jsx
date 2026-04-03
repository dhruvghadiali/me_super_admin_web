import { useTranslation } from "react-i18next";
import { RefreshCw, Plus, AlertTriangleIcon } from "lucide-react";

import _ from "lodash";

import { Button } from "@MEShadcnComponents/button";
import { Card, CardContent } from "@MEShadcnComponents/card";
import {
  dataListTryAgainButtonLabel,
  dataListNotFoundDefaultTitle,
  dataListNotFoundFooterMessage,
  dataListNotFoundDefaultMessage,
  dataListAddNewRecordButtonLabel,
} from "@MELocalization/en";

const MEDataListNotFoundComponent = (props) => {
  const { title, message, addButtonLabel, handleTryAgain, handleNewRecord } =
    props;
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-lg mx-auto border-0 bg-primary">
        <CardContent className="flex flex-col items-center justify-center p-8 sm:p-12 text-center space-y-6">
          <div className="relative mb-4">
            <div className="relative bg-secondary rounded-full p-3 border-2 border-primary">
              <AlertTriangleIcon className="h-10 w-10 sm:h-14 sm:w-14 text-primary" />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-secondary">
              {title ||
                _.upperFirst(
                  t("dataListNotFoundDefaultTitle", {
                    defaultValue: dataListNotFoundDefaultTitle,
                  }),
                )}
            </h2>
            <p className="text-sm sm:text-base text-secondary leading-relaxed max-w-md">
              {message ||
                t("dataListNotFoundDefaultMessage", {
                  defaultValue: dataListNotFoundDefaultMessage,
                })}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-4">
            <Button
              onClick={handleTryAgain}
              variant="outline"
              className="flex items-center gap-2 px-6 py-3 text-sm sm:text-base bg-transparent text-secondary hover:cursor-pointer hover:bg-secondary hover:text-primary"
            >
              <RefreshCw className="h-4 w-4" />
              {t("dataListTryAgainButtonLabel", {
                defaultValue: dataListTryAgainButtonLabel,
              })}
            </Button>

            <Button
              onClick={handleNewRecord}
              variant="outline"
              className="flex items-center gap-2 px-6 py-3 text-sm sm:text-base bg-secondary text-primary hover:bg-secondary hover:text-primary hover:cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              {addButtonLabel ||
                t("dataListAddNewRecordButtonLabel", {
                  defaultValue: dataListAddNewRecordButtonLabel,
                })}
            </Button>
          </div>

          {/* Additional Help Text */}
          <div className="pt-4 border-t border-secondary w-full">
            <p className="text-xs sm:text-sm text-secondary italic">
              {_.upperFirst(
                t("dataListNotFoundFooterMessage", {
                  defaultValue: dataListNotFoundFooterMessage,
                }),
              )}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MEDataListNotFoundComponent;
