import _ from "lodash";

const setEducationBoardsDropdownOptions = (educationBoards) => {
  if (_.isEmpty(educationBoards) || _.isNull(educationBoards)) {
    return [];
  }
  
  return _.map(educationBoards, (educationBoard) => ({
    label: _.get(educationBoard, "education_board", ""),
    value: _.get(educationBoard, "id", ""),
  }));
};

export { setEducationBoardsDropdownOptions };