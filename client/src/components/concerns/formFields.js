export default [
  { label: "Guest Name", name: "guestName", type: "text", placeholder: "Last/First" },

  { label: "Guest Zip Code", name: "zipCode", type: "text" },
  {
    label: "Description of Concern",
    name: "descOfConcern",
    placeholder: "Please be detailed",
    type: "text"
  },
  { label: "Clerk ID", name: "clerkId", placeholder: "abcd123", type: "text" },
  {
    label: "Recipient List",
    name: "recipients",
    placeholder: "recoveryteam@company.com",
    type: "text"
  },
  {
    label: "Recovery Date (mm/dd/yy)",
    name: "recoveryCheck",
    type: "text",
    placeholder: "If no recovery, leave blank"
  },
  {
    label: "Description of Recovery",
    name: "descOfRecovery",
    type: "text",
    placeholder: "If no recovery, leave blank"
  }
];
