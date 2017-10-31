const ALL_ROLES = ["regular", "admin"];

const ACTIONS_TO_ROLES = {
  createContact: ["admin"],
  deleteContact: ["admin"],
  viewContacts: ["admin", "regular"],
};

const hasPermissions = (role, action) => {
  const allActions = Object.keys(ACTIONS_TO_ROLES);
  if (!ALL_ROLES.includes(role)) {
    throw new Error(`Role ${role} does not exist!`);
  } else if (!allActions.includes(action)) {
    throw new Error(`Action ${action} does not exist!`);
  } else {
    return ACTIONS_TO_ROLES[action].includes(role);
  }
};

module.exports = hasPermissions;
