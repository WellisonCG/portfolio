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
    <div className="flex w-full max-w-[1200px] items-start justify-between px-[80px] pb-[100px] pt-[80px]">
      <InterFinancesSidebar />
      <InterFinancesContent />
    </div>
  );
}
