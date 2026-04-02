import {
  organizationMembersMinLimit,
  organizationMembersMaxLimit,
  organizationMemberPositionMinChar,
  organizationMemberPositionMaxChar,
} from "@MEUtils/validationConst";

const organizationMembersMaxAllowed = `Maximum ${organizationMembersMaxLimit} organization members allowed`;
const organizationMembersMinRequired = `At least ${organizationMembersMinLimit} organization member is required`;

const organizationMemberPositionRequired = `Position is required`;
const organizationMemberPositionMaxLength = `Position must be at most ${organizationMemberPositionMaxChar} characters`;
const organizationMemberPositionMinLength = `Position must be at least ${organizationMemberPositionMinChar} characters`;

export {
  organizationMembersMinRequired,
  organizationMembersMaxAllowed,
  organizationMemberPositionRequired,
  organizationMemberPositionMinLength,
  organizationMemberPositionMaxLength,
};
