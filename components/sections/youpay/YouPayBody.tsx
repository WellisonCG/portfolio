/*
  YouPayBody
  ─────────────────────────────────────────────────────────────────────────────
  Framer node: Body (bnOciEGrP) inside Desktop (SMcAWBT6b)

  Spec:
  - layout: stack horizontal · distribution: space-between · alignment: start
  - max-width: 1200px · padding: 80px 80px 100px 80px

  Children:
  - YouPaySidebar: sticky nav, ~180px wide
  - YouPayContent: article body, max-width 800px
*/

import YouPaySidebar from "./YouPaySidebar";
import YouPayContent from "./YouPayContent";

export default function YouPayBody() {
  return (
    <div className="flex w-full max-w-[1200px] items-start justify-center px-[40px] lg:justify-between lg:px-[80px] lg:pb-[100px]">
      <YouPaySidebar />
      <YouPayContent />
    </div>
  );
}
