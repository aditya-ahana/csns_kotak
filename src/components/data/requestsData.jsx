export const requestPhases = ["Completed", "In-progress", "Failed"];

export const requiredReportsData = [
  "Statement in PDF/Excel",
  "Beneficiary details for Single IMPS transactions",
  "Beneficiary details for Bulk IMPS transactions",
  "Beneficiary details for Single UPI transactions",
  "Beneficiary details for Bulk UPI transactions",
  "IP Logs",
  "Device details",
];

export const availableParameters = [
  "Account number",
  "CRN",
  "RRN",
  "PAN",
  "Aadhar",
  "Mobile No.",
  "Debit Card",
  "Credit Card",
  "Email ID",
];

export const requestList = [
  {
    ticketId: "1300",
    requests: [
      "Statement in PDF/Excel",
      "Beneficiary Details of IMPS Txns",
      "Beneficiary Details of UPI Txns",
      "IP Logs",
      "Device Details",
    ],
    status: "In-progress",
    createdDate: "31-05-2024",
    requester: "System",
  },
  {
    ticketId: "1299",
    requests: [
      "Statement in PDF/Excel",
      "Beneficiary Details of IMPS Txns",
      "Beneficiary Details of UPI Txns",
      "IP Logs",
      "Device Details",
    ],
    status: "Completed",
    createdDate: "08-04-2024",
    requester: "User",
  },
  {
    ticketId: "1298",
    requests: [
      "Statement in PDF/Excel",
      "Beneficiary Details of IMPS Txns",
      "Device Details",
    ],
    status: "Failed",
    createdDate: "08-03-2024",
    requester: "Admin",
  },
  {
    ticketId: "1297",
    requests: [
      "Statement in PDF/Excel",
      "Beneficiary Details of IMPS Txns",
      "IP Logs",
    ],
    status: "In-progress",
    createdDate: "12-01-2024",
    requester: "System",
  },
  {
    ticketId: "1296",
    requests: [
      "Beneficiary Details of IMPS Txns",
      "Beneficiary Details of UPI Txns",
      "IP Logs",
    ],
    status: "Failed",
    createdDate: "14-02-2023",
    requester: "Banker",
  },
  {
    ticketId: "1295",
    requests: ["IP Logs", "Device Details"],
    status: "In-progress",
    createdDate: "30-01-2023",
    requester: "Admin",
  },

  {
    ticketId: "1294",
    requests: [
      "Statement in PDF/Excel",
      "Beneficiary Details of IMPS Txns",
      "Beneficiary Details of UPI Txns",
      "IP Logs",
      "Device Details",
    ],
    status: "In-progress",
    createdDate: "12-01-2024",
    requester: "System",
  },
  {
    ticketId: "1293",
    requests: [
      "Statement in PDF/Excel",
      "Beneficiary Details of IMPS Txns",
      "Beneficiary Details of UPI Txns",
      "IP Logs",
      "Device Details",
    ],
    status: "Completed",
    createdDate: "04-12-2023",
    requester: "User",
  },
  {
    ticketId: "1292",
    requests: [
      "Statement in PDF/Excel",
      "Beneficiary Details of IMPS Txns",
      "Device Details",
    ],
    status: "Failed",
    createdDate: "21-04-2023",
    requester: "Admin",
  },
  {
    ticketId: "1291",
    requests: [
      "Statement in PDF/Excel",
      "Beneficiary Details of IMPS Txns",
      "IP Logs",
    ],
    status: "In-progress",
    createdDate: "02-03-2023",
    requester: "System",
  },
  {
    ticketId: "1290",
    requests: [
      "Beneficiary Details of IMPS Txns",
      "Beneficiary Details of UPI Txns",
      "IP Logs",
    ],
    status: "Failed",
    createdDate: "14-02-2023",
    requester: "Banker",
  },
  {
    ticketId: "1289",
    requests: ["IP Logs", "Device Details"],
    status: "In-progress",
    createdDate: "30-01-2023",
    requester: "Admin",
  },

  {
    ticketId: "1288",
    requests: [
      "Statement in PDF/Excel",
      "Beneficiary Details of IMPS Txns",
      "Beneficiary Details of UPI Txns",
      "IP Logs",
      "Device Details",
    ],
    status: "In-progress",
    createdDate: "10-01-2024",
    requester: "System",
  },
  {
    ticketId: "1287",
    requests: [
      "Statement in PDF/Excel",
      "Beneficiary Details of IMPS Txns",
      "Beneficiary Details of UPI Txns",
      "IP Logs",
      "Device Details",
    ],
    status: "Completed",
    createdDate: "08-12-2023",
    requester: "User",
  },
  {
    ticketId: "1286",
    requests: [
      "Statement in PDF/Excel",
      "Beneficiary Details of IMPS Txns",
      "Device Details",
    ],
    status: "Failed",
    createdDate: "21-04-2023",
    requester: "Admin",
  },
  {
    ticketId: "1285",
    requests: [
      "Statement in PDF/Excel",
      "Beneficiary Details of IMPS Txns",
      "IP Logs",
    ],
    status: "In-progress",
    createdDate: "02-03-2023",
    requester: "System",
  },
  {
    ticketId: "1284",
    requests: [
      "Beneficiary Details of IMPS Txns",
      "Beneficiary Details of UPI Txns",
      "IP Logs",
    ],
    status: "Failed",
    createdDate: "14-02-2023",
    requester: "Banker",
  },
  {
    ticketId: "1283",
    requests: ["IP Logs", "Device Details"],
    status: "In-progress",
    createdDate: "30-01-2023",
    requester: "Admin",
  },
];

export const requestDetails = [
  {
    ticketId: "1300",
    request: "Statement in PDF/Excel",
    status: "In-progress",
    createdDateTime: "28-06-2024",
    createdBy: "User",
    subData: [
      {
        accNo: "123456789",
      },
      {
        accNo: "98765432",
      },
      {
        accNo: "34568656",
      },
      {
        accNo: "745656",
      },
      {
        accNo: "2343",
      },
      {
        accNo: "976565",
      },
    ],
  },
  {
    ticketId: "1300",
    request: "Beneficiary Details of IMPS Txns",
    status: "Completed",
    createdDateTime: "28-06-2024",
    createdBy: "User",
    subData: [
      {
        accNo: "456565",
      },
      {
        accNo: "2423576",
      },
      {
        accNo: "9757642",
      },
      {
        accNo: "434",
      },
      {
        accNo: "8767",
      },
      {
        accNo: "745656",
      },
      {
        accNo: "2343",
      },
    ],
  },
  {
    ticketId: "1300",
    request: "Beneficiary Details of UPI Txns",
    status: "Failed",
    createdDateTime: "28-06-2024",
    createdBy: "User",
    subData: [
      {
        accNo: "9754",
      },
      {
        accNo: "4545",
      },
      {
        accNo: "98475",
      },
      {
        accNo: "434",
      },
      {
        accNo: "9757642",
      },
      {
        accNo: "434",
      },
      {
        accNo: "8767",
      },
      {
        accNo: "745656",
      },
    ],
  },
  {
    ticketId: "1300",
    request: "IP Logs",
    status: "In-progress",
    createdDateTime: "28-06-2024",
    createdBy: "User",
    subData: [
      {
        accNo: "93487",
      },
      {
        accNo: "7642",
      },
      {
        accNo: "98343",
      },
      {
        accNo: "2335",
      },
      {
        accNo: "8923",
      },
      {
        accNo: "56342",
      },
      {
        accNo: "24562",
      },
      {
        accNo: "745656",
      },
    ],
  },
  {
    ticketId: "1300",
    request: "Device Details",
    status: "In-progress",
    createdDateTime: "28-06-2024",
    createdBy: "User",
    subData: [
      {
        accNo: "93487",
      },

      {
        accNo: "456",
      },
      {
        accNo: "2345",
      },

      {
        accNo: "2345634",
      },
      {
        accNo: "45634",
      },
    ],
  },
  {
    ticketId: "1300",
    request: "Statement in PDF/Excel",
    status: "In-progress",
    createdDateTime: "28-06-2024",
    createdBy: "User",
    subData: [
      {
        accNo: "123456789",
      },
      {
        accNo: "98765432",
      },
      {
        accNo: "34568656",
      },
      {
        accNo: "745656",
      },
      {
        accNo: "2343",
      },
      {
        accNo: "976565",
      },
    ],
  },
  {
    ticketId: "1300",
    request: "Beneficiary Details of IMPS Txns",
    status: "Completed",
    createdDateTime: "28-06-2024",
    createdBy: "User",
    subData: [
      {
        accNo: "456565",
      },
      {
        accNo: "2423576",
      },
      {
        accNo: "9757642",
      },
      {
        accNo: "434",
      },
      {
        accNo: "8767",
      },
      {
        accNo: "745656",
      },
      {
        accNo: "2343",
      },
    ],
  },
  {
    ticketId: "1300",
    request: "Beneficiary Details of UPI Txns",
    status: "Failed",
    createdDateTime: "28-06-2024",
    createdBy: "User",
    subData: [
      {
        accNo: "9754",
      },
      {
        accNo: "4545",
      },
      {
        accNo: "98475",
      },
      {
        accNo: "434",
      },
      {
        accNo: "9757642",
      },
      {
        accNo: "434",
      },
      {
        accNo: "8767",
      },
      {
        accNo: "745656",
      },
    ],
  },
  {
    ticketId: "1300",
    request: "IP Logs",
    status: "In-progress",
    createdDateTime: "28-06-2024",
    createdBy: "User",
    subData: [
      {
        accNo: "93487",
      },
      {
        accNo: "7642",
      },
      {
        accNo: "98343",
      },
      {
        accNo: "2335",
      },
      {
        accNo: "8923",
      },
      {
        accNo: "56342",
      },
      {
        accNo: "24562",
      },
      {
        accNo: "745656",
      },
    ],
  },
  {
    ticketId: "1300",
    request: "Device Details",
    status: "In-progress",
    createdDateTime: "28-06-2024",
    createdBy: "User",
    subData: [
      {
        accNo: "93487",
      },

      {
        accNo: "456",
      },
      {
        accNo: "2345",
      },

      {
        accNo: "2345634",
      },
      {
        accNo: "45634",
      },
    ],
  },
  {
    ticketId: "1300",
    request: "Statement in PDF/Excel",
    status: "In-progress",
    createdDateTime: "28-06-2024",
    createdBy: "User",
    subData: [
      {
        accNo: "123456789",
      },
      {
        accNo: "98765432",
      },
      {
        accNo: "34568656",
      },
      {
        accNo: "745656",
      },
      {
        accNo: "2343",
      },
      {
        accNo: "976565",
      },
    ],
  },
  {
    ticketId: "1300",
    request: "Beneficiary Details of IMPS Txns",
    status: "Completed",
    createdDateTime: "28-06-2024",
    createdBy: "User",
    subData: [
      {
        accNo: "456565",
      },
      {
        accNo: "2423576",
      },
      {
        accNo: "9757642",
      },
      {
        accNo: "434",
      },
      {
        accNo: "8767",
      },
      {
        accNo: "745656",
      },
      {
        accNo: "2343",
      },
    ],
  },
  {
    ticketId: "1300",
    request: "Beneficiary Details of UPI Txns",
    status: "Failed",
    createdDateTime: "28-06-2024",
    createdBy: "User",
    subData: [
      {
        accNo: "9754",
      },
      {
        accNo: "4545",
      },
      {
        accNo: "98475",
      },
      {
        accNo: "434",
      },
      {
        accNo: "9757642",
      },
      {
        accNo: "434",
      },
      {
        accNo: "8767",
      },
      {
        accNo: "745656",
      },
    ],
  },
  {
    ticketId: "1300",
    request: "IP Logs",
    status: "In-progress",
    createdDateTime: "28-06-2024",
    createdBy: "User",
    subData: [
      {
        accNo: "93487",
      },
      {
        accNo: "7642",
      },
      {
        accNo: "98343",
      },
      {
        accNo: "2335",
      },
      {
        accNo: "8923",
      },
      {
        accNo: "56342",
      },
      {
        accNo: "24562",
      },
      {
        accNo: "745656",
      },
    ],
  },
  {
    ticketId: "1300",
    request: "Device Details",
    status: "In-progress",
    createdDateTime: "28-06-2024",
    createdBy: "User",
    subData: [
      {
        accNo: "93487",
      },

      {
        accNo: "456",
      },
      {
        accNo: "2345",
      },

      {
        accNo: "2345634",
      },
      {
        accNo: "45634",
      },
    ],
  },
];
