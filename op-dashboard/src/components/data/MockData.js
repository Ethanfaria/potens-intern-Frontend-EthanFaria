export const actionItems = [
  {
    id: "a1",
    code: "PO-78241",
    title: "Vendor payment release — Tata Steel (₹2.4 Cr)",
    context: "Due today 12:00 · SLA breach triggers penalty clause §14b",
    priority: "P1",
  },
  {
    id: "a2",
    code: "COMP-0041",
    title: "Regulatory filing — GST reconciliation Q4 FY25",
    context: "Portal closes 11:59 PM · Late filing penalty ₹50/day per GSTIN",
    priority: "P1",
  },
  {
    id: "a3",
    code: "HR-2205",
    title: "Headcount approval — Mumbai ops team (2 FTEs)",
    context:
      "Interview scheduled Fri · Offer expires in 48 hrs if not confirmed",
    priority: "P2",
  },
  {
    id: "a4",
    code: "LOG-9910",
    title: "Fleet re-routing approval — NH-48 closure (Pune–Mumbai)",
    context: "6 trucks en route · Alternate via NH-65 adds 90 min + ₹18,000",
    priority: "P2",
  },
  {
    id: "a5",
    code: "IT-3317",
    title: "Emergency patch deployment — WMS v4.1.2",
    context: "Critical CVE fixed · Maintenance window 1–3 AM · Rollback ready",
    priority: "P3",
  },
];

export const anomalies = [
  {
    id: "ANO-001",
    severity: "critical",
    system: "WMS",
    title: "Inventory discrepancy — Warehouse 3 (Bhiwandi)",
    description:
      "System shows 1,240 units; physical count 987. Δ 253 units (SKU: PLT-44X)",
    time: "08:14",
    impact: "−20.4%",
  },
  {
    id: "ANO-002",
    severity: "high",
    system: "ERP",
    title: "Duplicate PO detected — vendor GSTIN mismatch",
    description:
      "PO #78108 and #78241 share identical line items · Double-payment risk",
    time: "07:51",
    impact: "₹2.4Cr",
  },
  {
    id: "ANO-003",
    severity: "high",
    system: "Fleet",
    title: "GPS signal lost — 3 vehicles (>45 min)",
    description:
      "Trucks MH-04-CF-1221, 1334, 1892 off radar since 07:09 · Last seen Khopoli",
    time: "07:09",
    impact: "3 veh",
  },
  {
    id: "ANO-004",
    severity: "medium",
    system: "Payments",
    title: "Batch settlement delayed — NEFT cycle missed",
    description:
      "Scheduled 07:30 NEFT run failed · 14 vendor payments queued · Retry 11:00",
    time: "07:30",
    impact: "14 txn",
  },
];
