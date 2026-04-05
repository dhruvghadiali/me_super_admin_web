import _ from "lodash";

const MEScreenHeaderComponent = (props) => {
  const { title, subtitle } = props;

  return (
    <div>
      <p className="text-3xl font-semibold">
        { _.startCase(title)}
      </p>
      <p className="text-sm mt-1">
        { _.upperFirst(subtitle)}
      </p>
    </div>
  );
};

export default MEScreenHeaderComponent;
