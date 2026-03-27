/*
  InterFinancesContent
  ─────────────────────────────────────────────────────────────────────────────
  Article body for the Inter My Finances case study.
  Content extracted from wellisoncg.com/inter-my-finances.

  Sections: Context · Challenge · Solution · Discovery · Validation ·
            Ideation · Prototyping · Usability Tests · Impact
*/

import Image from "next/image";

// ─── Image references ──────────────────────────────────────────────────────
const IMG = {
  solution:       "https://framerusercontent.com/images/duNaGnHQ1773zclDJTXNoUrk7KY.png",
  validation1:    "https://framerusercontent.com/images/LxPt3ONMyEaXpLXJdfTuQosJBs.png",
  validation2:    "https://framerusercontent.com/images/wUBKrEL09SBOSJHS4XM7HtsO5vA.png",
  validation3:    "https://framerusercontent.com/images/Nic68CKwnSJ6InWvF0dme48Ps.png",
  ideation1:      "https://framerusercontent.com/images/3WDGAe5ZDXiWGdfyBGEmtpL3yM.png",
  ideation2:      "https://framerusercontent.com/images/CDkCj1JRH9enugItxpT5jaflvAs.png",
  ideation3:      "https://framerusercontent.com/images/Y2zQleIioFSUkFJGlUbnY1Uu8.png",
  prototype1:     "https://framerusercontent.com/images/bWsh6nCY8RLuhdYxtyKqN2gaGFw.png",
  prototype2:     "https://framerusercontent.com/images/ZMnpAfqf2vG7NCsRhWjQCuGSyKE.png",
  usabilityTests: "https://framerusercontent.com/images/iV0lv3RseCFXX0B8GtVyYYk9RA.png",
  impact:         "https://framerusercontent.com/images/8uQ23VXRezw9FDhUmINLPd9KqQ.png",
};

const PERSONA_LUIZAO = "https://framerusercontent.com/images/I1HALKgXyKU1WYxxpsBHGG95DQ.png";
const PERSONA_KATIA  = "https://framerusercontent.com/images/M3gy8tCgGXHV9zHBH2rxHUb2LM.png";

// ─── Reusable sub-components ───────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-sans text-[48px] font-bold leading-[1.1] tracking-[-0.02em] text-primary">
      {children}
    </h2>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[20px] font-normal leading-[1.5] text-muted">
      {children}
    </p>
  );
}

// Callout uses 24px muted — matches Inter's Framer source (differs from youpay's 20px primary)
function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l border-muted pl-[24px]">
      <p className="font-sans text-[24px] font-normal leading-[1.5] text-muted">
        {children}
      </p>
    </div>
  );
}

function TakeawaysLabel() {
  return (
    <span className="font-sans text-[24px] font-normal text-muted">
      Key Takeaways:
    </span>
  );
}

function ContentImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-[16px]"
      style={{ aspectRatio: "1.5625 / 1" }}
    >
      <Image src={src} alt={alt} fill className="object-cover" sizes="800px" />
    </div>
  );
}

function OL({ items }: { items: string[] }) {
  return (
    <ol className="flex flex-col gap-[8px]">
      {items.map((item, i) => (
        <li key={i} className="flex gap-[8px] font-sans text-[20px] leading-[1.5] text-muted">
          <span className="shrink-0 text-[#6f6f76]">{i + 1}.</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

function UL({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-[8px]">
      {items.map((item, i) => (
        <li key={i} className="flex gap-[8px] font-sans text-[20px] leading-[1.5] text-muted">
          <span className="mt-[12px] h-[4px] w-[4px] shrink-0 rounded-full bg-muted" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// ─── PersonaCard ───────────────────────────────────────────────────────────

interface PersonaCardProps {
  name: string;
  avatarSrc: string;
  quote: string;
  age: string;
  occupation: string;
  education: string;
  salary: string;
  pains: string[];
  painkillers: string[];
}

function PersonaCard({
  name,
  avatarSrc,
  quote,
  age,
  occupation,
  education,
  salary,
  pains,
  painkillers,
}: PersonaCardProps) {
  const labels = [
    { label: "Age:", value: age },
    { label: "Occupation:", value: occupation },
    { label: "Educational Level:", value: education },
    { label: "Salary:", value: salary },
  ];

  return (
    <div
      className="flex w-full flex-col overflow-hidden rounded-[16px] border border-white/10 backdrop-blur-[2px]"
      style={{ background: "linear-gradient(96deg, #191919ab 0.26%, rgba(25, 25, 25, 0.3) 96.06%)" }}
    >
      {/* Header: avatar + info */}
      <div className="flex flex-col gap-[24px] p-[24px] sm:flex-row">
        {/* Avatar + name */}
        <div className="flex shrink-0 flex-col items-center gap-[12px]">
          <div className="relative h-[122px] w-[122px] overflow-hidden rounded-[12px]">
            <Image
              src={avatarSrc}
              alt={name}
              fill
              className="object-contain"
              sizes="122px"
            />
          </div>
          <span className="font-sans text-[20px] font-bold text-primary">{name}</span>
        </div>

        {/* Quote + meta labels */}
        <div className="flex flex-col gap-[16px]">
          <p className="font-sans text-[20px] font-normal leading-[1.5] text-muted">
            &ldquo;{quote}&rdquo;
          </p>
          <div className="grid grid-cols-2 gap-x-[24px] gap-y-[12px]">
            {labels.map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-[2px]">
                <span className="font-sans text-[14px] leading-[1.5] text-[#6f6f76]">
                  {label}
                </span>
                <span className="font-sans text-[14px] leading-[1.5] text-muted">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pains & Painkillers */}
      <div className="grid grid-cols-2 border-t border-white/10">
        <div className="flex flex-col gap-[16px] border-r border-white/10 p-[24px]">
          <span className="font-sans text-[20px] font-normal leading-[1.1] text-[#ff7a00]">
            Pains
          </span>
          <ol className="flex flex-col gap-[8px]">
            {pains.map((pain, i) => (
              <li
                key={i}
                className="flex gap-[8px] font-sans text-[16px] leading-[1.5] text-muted"
              >
                <span className="shrink-0 text-[#6f6f76]">{i + 1}.</span>
                <span>{pain}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-[16px] p-[24px]">
          <span className="font-sans text-[20px] font-normal leading-[1.1] text-[#ff7a00]">
            Painkillers
          </span>
          <ol className="flex flex-col gap-[8px]">
            {painkillers.map((pk, i) => (
              <li
                key={i}
                className="flex gap-[8px] font-sans text-[16px] leading-[1.5] text-muted"
              >
                <span className="shrink-0 text-[#6f6f76]">{i + 1}.</span>
                <span>{pk}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────

export default function InterFinancesContent() {
  return (
    <div className="flex w-full max-w-[800px] flex-col gap-[80px]">

      {/* ── Overview ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-[48px]">
        <div className="grid grid-cols-2 gap-[24px]">
          <div className="flex flex-col gap-[8px]">
            <span className="font-sans text-[20px] font-normal text-[#6f6f76]">Role</span>
            <span className="font-sans text-[18px] font-normal text-primary">UX | UI Designer</span>
          </div>
          <div className="flex flex-col gap-[8px]">
            <span className="font-sans text-[20px] font-normal text-[#6f6f76]">Duration</span>
            <span className="font-sans text-[18px] font-normal text-primary">3 months (July 2021)</span>
          </div>
        </div>

        <div className="flex flex-col gap-[24px]">
          <Body>
            Inter My Finances is the final project of my UX Design specialization on Program UX
            Unicorn. The objective was put in practice the UX methodologies in a real problem, that
            way, with my team, we choose the Banco Inter (a Brazilian digital bank) as a start
            point, to have a real client with real data.
          </Body>
          <Body>
            During this article I will focus on my contributions in the project, although I need to
            thank you and point the exceptional work of all my team. Special thanks to{" "}
            <a
              href="https://www.linkedin.com/in/carolinakieling/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0099ff] underline"
            >
              Carolina Kieling,
            </a>{" "}
            <a
              href="https://www.linkedin.com/in/carolbitt/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0099ff] underline"
            >
              Caroline Bittencourt,
            </a>{" "}
            <a
              href="https://www.linkedin.com/in/karin-bandartchuc/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0099ff] underline"
            >
              Karin Bandartchuc,
            </a>{" "}
            <a
              href="https://www.linkedin.com/in/marcelle-menezes/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0099ff] underline"
            >
              Marcelle Menezes,
            </a>{" "}
            <a
              href="https://www.linkedin.com/in/sandra-yoshie-417024193"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0099ff] underline"
            >
              Sandra Yoshie
            </a>
            .
          </Body>
        </div>
      </div>

      {/* ── Context ───────────────────────────────────────────────────────── */}
      <section id="context" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>Context</SectionHeading>
        <div className="flex flex-col gap-[24px]">
          <Body>
            In 2020 the Brazilian financial sector had a big growth, especially some fintechs.
            Despite the Covid pandemics, these companies grew by around 34%. In turn, the Banco
            Inter in its operational report from the same year announced a{" "}
            <strong className="font-bold text-primary">
              108% growth in the accounts number
            </strong>{" "}
            in comparison to the previous year.
          </Body>
          <Body>
            Although, in research made by CNDL/SPC Brasil showed us that{" "}
            <strong className="font-bold text-primary">
              48% of Brazilians don&apos;t control their expenses
            </strong>{" "}
            and the other 52%, that has some financial control, don&apos;t do this in a right
            manner. In addition, with the pandemic&apos;s impact, 80% of Brazilians had their
            finances even more affected, getting the scenario worse and reinforcing the importance
            to control expenses.
          </Body>
        </div>
      </section>

      {/* ── Challenge ─────────────────────────────────────────────────────── */}
      <section id="challenge" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>Challenge</SectionHeading>
        <Callout>
          <em>
            How can we offer a personal financial management to collaborate with the optimization
            of expenses and to improve the quality of life from the customers of Banco Inter.
          </em>
        </Callout>
        <Body>
          The Banco Inter has as slogan &ldquo;Create what makes people&apos;s life easier&rdquo;
          and, to achieve this mission, it offers features as cashback and financial investments,
          although it didn&apos;t have any solution for expenses management and planning goals.
        </Body>
      </section>

      {/* ── Solution ──────────────────────────────────────────────────────── */}
      <section id="solution" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>Solution</SectionHeading>
        <Callout>
          <em>
            Provide an area for user expense control, integrated with the differentials offered by
            Inter to accelerate the personal goals of its customers.
          </em>
        </Callout>
        <Body>
          By providing a better view of expenses and earnings, Banco Inter users are benefited from
          keeping their finances centralized in just one place, resulting in greater exposure to
          other services organically, and increased interest in staying within this ecosystem, also
          benefiting the institution.
        </Body>
        <ContentImage src={IMG.solution} alt="Inter My Finances — solution overview" />
      </section>

      {/* ── Discovery ─────────────────────────────────────────────────────── */}
      <section id="discovery" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>Discovery</SectionHeading>
        <Body>
          Starting from a better view of the market and with the projected objectives, we developed
          the personas of our users. Based on them, we were able to identify the main difficulties
          and complaints of our target audience, in terms of financial planning, as well as thinking
          about opportunities and solutions to solve their pains.
        </Body>
        <PersonaCard
          name="Luizão"
          avatarSrc={PERSONA_LUIZAO}
          quote="I try to take notes of everything, but I always lose myself. Wasn't suppose my bills been this much…"
          age="20 years"
          occupation="Mall Salesman"
          education="Attending in Biology"
          salary="R$ 1.500/m + commissions"
          pains={[
            "Doesn't know how he spends so much money;",
            "No patience to update his expenses record;",
            "Insecure about his financial future;",
            "Wishes to save money for studying abroad.",
          ]}
          painkillers={[
            "Intuitive and constantly updated management;",
            "Optimized updating through bank statements;",
            "Long-term financial planning;",
            "Tracking of goals and objectives.",
          ]}
        />
        <PersonaCard
          name="Kátia"
          avatarSrc={PERSONA_KATIA}
          quote="I would like to have my financial independence, but I'm living paycheck to paycheck..."
          age="32 years"
          occupation="Social Media"
          education="Advertising degree"
          salary="R$ 2.500/m"
          pains={[
            "Lacks patience with management apps;",
            "Struggles to organize bills;",
            "Complains about high bank fees and slow customer service;",
            "Sometimes needs family help to pay rent;",
            "Wishes to buy a house, but doesn't have enough money.",
          ]}
          painkillers={[
            "Intuitive and easy-to-navigate app;",
            "Payment due date alerts;",
            "Fee-free digital account, swift virtual assistance;",
            "Expense management by category and checklist of paid bills;",
            "Assistance in saving money and buying the house.",
          ]}
        />
      </section>

      {/* ── Validation ────────────────────────────────────────────────────── */}
      <section id="validation" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>Validation</SectionHeading>
        <Body>
          With the personas created, we started to create our hypotheses about the financial
          behavior of our audience.
        </Body>
        <ContentImage src={IMG.validation1} alt="Inter My Finances — hypothesis mapping" />
        <ContentImage src={IMG.validation2} alt="Inter My Finances — quantitative survey" />
        <div className="flex flex-col gap-[24px]">
          <Body>
            Based on the research, it was natural to conclude that some scenarios were almost rights:
          </Body>
          <OL
            items={[
              "Brazilians, in general, do not have financial planning;",
              "In most budgets, there is no money left after paying expenses;",
              "People rarely keep money for an emergency or a personal goal.",
            ]}
          />
          <Body>
            This and other hypotheses were tested with a quantitative survey. After capturing 149
            responses, we were able to analyze and even be surprised at how wrong we were:
          </Body>
          <UL
            items={[
              "90% of interviewed were doing some financial planning;",
              "87% of respondents declared to have at least a little money left at the end of the month;",
              "77% of respondents had a reserve of money.",
            ]}
          />
          <Body>
            After the research results, it was necessary to better understand the financial behavior
            of the interviewed, but also the behavior of real users of Banco Inter, so we conducted
            a qualitative survey with some of the respondents.
          </Body>
        </div>
        <ContentImage src={IMG.validation3} alt="Inter My Finances — qualitative research" />
        <div className="flex flex-col gap-[24px]">
          <Body>
            Before talking about the learnings from this stage, I just want to point out how nervous
            and excited I was in these first interviews, it was the first user interview of my career
            and I keep this memory with much affection.
          </Body>
          <Body>Getting back to the data! 😊</Body>
          <Body>
            After exploring the financial daily life of the interviewed more closely, we noticed that
            the real scenario was different from the sample collected in the quantitative survey,
            probably because were closed questions. By talking to 6 participants from the first
            survey, we were able to extract the following learnings:
          </Body>
          <OL
            items={[
              "In general, financial planning was doing manually, which generated a huge amount of work to track expenses, discouraging the interviewed to the point of giving up after a few months;",
              "Banco Inter users did not use many other Bank features besides credit card and transfers;",
              "Although they reported having a money reserve, respondents generally had difficulty saving money and reaching their financial goals;",
              "When asked about the use of an app to make easier the management, most did not show interest, and few who had already used it declared not to feel comfortable sharing their financial data with third-party apps.",
            ]}
          />
        </div>
      </section>

      {/* ── Ideation ──────────────────────────────────────────────────────── */}
      <section id="ideation" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>Ideation</SectionHeading>
        <div className="flex flex-col gap-[24px]">
          <Body>
            After the research phase, it became clear that our efforts should be put into creating a
            solution that did not require repetitive effort from the user into add expenses, that was
            simple, intuitive, and that would make better use of the various resources offered by
            Banco Inter.
          </Body>
          <Body>Time to roll up your sleeves and sketch out the first ideas!</Body>
        </div>
        <ContentImage src={IMG.ideation1} alt="Inter My Finances — ideation sketches" />
        <Body>
          Since we still had plenty of time and wanted to experience all stages of a project, we
          decided to conduct a usability test at this stage to validate our proposals. We embraced
          the truest UX cliché, &ldquo;fail fast to learn fast&rdquo;.
        </Body>
        <ContentImage src={IMG.ideation2} alt="Inter My Finances — early usability test" />
        <div className="flex flex-col gap-[24px]">
          <Body>
            The proposal was to give Inter users a view of everything that came in and went out
            during the month, mapping expenses through the use of the account, providing an area for
            them to create personal goals and set spending limits for the categories already existing
            on their credit card.
          </Body>
          <Body>
            The tests were successful, and revealed only small points of improvement in some
            interactions on the home page. With this, the solution was evolved and the user flow was
            designed.
          </Body>
        </div>
        <ContentImage src={IMG.ideation3} alt="Inter My Finances — user flow" />
      </section>

      {/* ── Prototyping ───────────────────────────────────────────────────── */}
      <section id="prototype" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>Prototyping</SectionHeading>
        <div className="flex flex-col gap-[24px]">
          <Body>
            To standardize all screens, a style guide was created based on the identity already used
            by Inter in its application.
          </Body>
          <Body>
            In this stage, I particularly had some difficulty, as Inter itself uses various design
            patterns for its products, creating some inconsistencies, so I chose to focus on the
            most recurring patterns and create a reduced version of the Style Guide used by the
            brand.
          </Body>
        </div>
        <ContentImage src={IMG.prototype1} alt="Inter My Finances — style guide" />
        <Body>
          To carry out the final usability tests, the flow screens were evolved to high fidelity and
          then prototyped.
        </Body>
        <ContentImage src={IMG.prototype2} alt="Inter My Finances — high fidelity prototype" />
      </section>

      {/* ── Usability Tests ───────────────────────────────────────────────── */}
      <section id="usability-tests" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>Usability Tests</SectionHeading>
        <Body>
          As in the first test stage, we created a test script with some tasks for the users, and
          we followed a model of an interviewer and someone to listen carefully and take notes.
        </Body>
        <ContentImage src={IMG.usabilityTests} alt="Inter My Finances — usability test session" />
        <Body>
          We tested our prototype with eleven people, divided in two different groups: one group for
          the expenses and earnings journey and the other for the goals and the month planning
          journey. As the first tests, we were able to find some improvement points, so we were
          fixing the big problems and testing to refine the journeys.
        </Body>
        <div className="flex flex-col gap-[16px]">
          <TakeawaysLabel />
          <UL
            items={[
              "Rename and redesign the main card to help users to find our feature at the app's homepage;",
              "Refine the \"Income\" section, to make it easier for users to distinguish between received incomes and future incomes;",
              "Adjust the copywriting of all flow to match with used terms from interviews during the tests.",
            ]}
          />
        </div>
        <Body>
          After all changes, we had our solution for release, besides offering a simple planning
          system to the users, we also helped them achieve their objectives with investment tips
          based on their profile and give them products with cashback based on their personal goals.
        </Body>
      </section>

      {/* ── Impact ────────────────────────────────────────────────────────── */}
      <section id="impact" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>The impact</SectionHeading>
        <Body>
          Being a study project, the main positive impact was practicing and applying what we
          learned during the program, but we also had to present it for UX professionals that would
          judge our skills and work.
        </Body>
        <ContentImage src={IMG.impact} alt="Inter My Finances — final presentation" />
        <div className="flex flex-col gap-[24px]">
          <Body>Max score on the project!! 🎉</Body>
          <Body>
            Certainly a great sense of achievement and pride between the entire team. As my first
            experience in the area, it was a huge learning process. I was happy to try many
            frameworks and methodologies in a single project, there&apos;s no doubt that helped me
            to define my design process that I still improve and use nowadays.
          </Body>
        </div>
      </section>

    </div>
  );
}
