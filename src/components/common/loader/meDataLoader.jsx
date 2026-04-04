import { Spinner } from "@MEShadcnComponents/spinner";
import { Progress } from "@MEShadcnComponents/progress";

const MEDataLoaderComponent = ({ loaderHeader, loaderMessage }) => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col items-center justify-center space-y-6 max-w-md mx-auto text-center">
        <Spinner className="text-primary h-8 w-8 sm:h-10 sm:w-10" />

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-semibold text-primary">
            {loaderHeader}
          </h2>
          <p className="text-sm sm:text-base text-primary leading-relaxed">
            {loaderMessage}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="w-full max-w-xs">
          <Progress
            value={100}
            className="h-2 bg-muted animate-pulse [&>div]:animate-[slide_2s_ease-in-out_infinite]"
          />
        </div>
      </div>
    </div>
  );
};

export default MEDataLoaderComponent;
