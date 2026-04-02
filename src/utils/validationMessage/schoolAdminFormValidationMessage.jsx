import { schoolAdminsMinLimit, schoolAdminsMaxLimit } from "@MEUtils/validationConst";

const schoolAdminsMaxAllowed = `Maximum ${schoolAdminsMaxLimit} school admins allowed`;
const schoolAdminsMinRequired = `At least ${schoolAdminsMinLimit} school admin is required`;

export {
  schoolAdminsMaxAllowed,
  schoolAdminsMinRequired,
};
