/**
 * Enumeration for school form accordion items.
 */
const SCHOOL_FORM_ACCORDION_ITEMS = Object.freeze({
  ORGANIZATION: "ORGANIZATION",
  ORGANIZATION_MEMBERS: "ORGANIZATION_MEMBERS",
  SCHOOL: "SCHOOL",
  SCHOOL_ADDRESSES: "SCHOOL_ADDRESSES",
  SCHOOL_ADMINS: "SCHOOL_ADMINS",
});


/**
 * Enumeration for school information for weeknames.
 */
const SCHOOL_WEEK_DAYS = Object.freeze({
  SUNDAY: "sunday",
  MONDAY: "monday",
  TUESDAY: "tuesday",
  WEDNESDAY: "wednesday",
  THURSDAY: "thursday",
  FRIDAY: "friday",
  SATURDAY: "saturday",
});

/**
 * Enumeration for school information view.
 */
const SCHOOL_INFORMATION_VIEW = Object.freeze({
  TABLE: "TABLE",
  FORM: "FORM",
});

/**
 * Enumeration for school screen DB operations.
 */
const SCHOOL_SCREEN_DB_OPERATIONS = Object.freeze({
  ADD: "ADD",
  EDIT: "EDIT",
  DELETE: "DELETE",
  VIEW: "VIEW",
});

/**
 * organization member position enumeration
 */
const ORGANIZATION_MEMBER_POSITION = Object.freeze({
  PRESIDENT: "president",
  VICE_PRESIDENT: "vice president",
  SECRETARY: "secretary",
  JOINT_SECRETARY: "joint secretary",
  TREASURER: "treasurer",
  MEMBER: "member",
  PRINCIPAL: "principal",
  OTHER: "other",
});

export {
  SCHOOL_WEEK_DAYS,
  SCHOOL_INFORMATION_VIEW,
  SCHOOL_FORM_ACCORDION_ITEMS,
  SCHOOL_SCREEN_DB_OPERATIONS,
  ORGANIZATION_MEMBER_POSITION,
};
