/*
  InterFinancesBody
  ─────────────────────────────────────────────────────────────────────────────
  Layout wrapper: sticky sidebar + scrollable content article.
  Mirrors YouPayBody structure exactly.
*/

import InterFinancesSidebar from "./InterFinancesSidebar";
import InterFinancesContent from "./InterFinancesContent";

export default function InterFinancesBody() {
  return (
    <div className="flex w-full max-w-[1200px] items-start justify-center px-[40px] lg:justify-between lg:px-[80px] lg:pb-[100px]">
      <InterFinancesSidebar />
      <InterFinancesContent />
    </div>
  );
}
