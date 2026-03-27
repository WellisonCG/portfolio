/*
  YouPayContent
  ─────────────────────────────────────────────────────────────────────────────
  Framer node: Content (ZzavlGnOr) inside Body (bnOciEGrP)

  Spec:
  - layout: grid (vertical sequence of sections)
  - width: ~800px · gap: 80px between sections

  Section order (10 anchors):
  #context · #challenge · #solution · #discovery · #ideation
  #prototype · #release · #improvement · #impact · #reflection

  Images: Framer CDN (framerusercontent.com) — replace with local assets for prod.
  Text: extracted from Framer XML node bnOciEGrP.
*/

import Image from "next/image";

// ─── Image references ──────────────────────────────────────────────────────
// TODO: download and move to /public/assets/youpay/content/ for production
const IMG = {
  context:    "https://framerusercontent.com/images/BOahdlRjuJYSleFe4nRtDTH2Q4o.png",
  solution:   "https://framerusercontent.com/images/rVe8zDfcfSxxWOt0rkI2YvORCOg.png",
  discovery:  "https://framerusercontent.com/images/UI3DK1sKPiTFRx4bZRa0CNsfZek.png",
  ideation:   "https://framerusercontent.com/images/rnDYu0slylaoyKEPPFkfhpUGZY.png",
  prototype1: "https://framerusercontent.com/images/Oi3NTPH3DipFFYvapME3fhtyPI.png",
  prototype2: "https://framerusercontent.com/images/vmF9oJUgVagk1rLusMND35gI7I.png",
  prototype3: "https://framerusercontent.com/images/Bi3OTg0uIJWlGRqI0mD1O4OlSLU.png",
  improvement:"https://framerusercontent.com/images/FXnUfco02IrfZKBKmRYI6plWWw.png",
};

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

// Callout — left accent border, used for HMW questions and emphasis blocks
function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l border-muted pl-[24px]">
      <p className="font-sans text-[20px] font-normal leading-[1.5] text-primary">
        {children}
      </p>
    </div>
  );
}

// Key takeaway list item
function Takeaway({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-[8px] font-sans text-[20px] leading-[1.5] text-muted">
      <span className="mt-[12px] h-[4px] w-[4px] shrink-0 rounded-full bg-muted" />
      <span>{children}</span>
    </li>
  );
}

// Key Takeaways section label — 24px Gabarito regular muted
function TakeawaysLabel() {
  return (
    <span className="font-sans text-[24px] font-normal text-muted">
      Key Takeaways:
    </span>
  );
}

// Stat block — large number + description
function Stat({ value, description }: { value: string; description: string }) {
  return (
    <div className="flex flex-col gap-[8px]">
      <span className="font-sans text-[48px] font-bold leading-[1] tracking-[-0.03em] text-primary">
        {value}
      </span>
      <span className="font-sans text-[20px] leading-[1.6] text-muted">{description}</span>
    </div>
  );
}

// Full-width content image — aspect ratio 1.5625:1 (800px × 512px)
function ContentImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-[16px]" style={{ aspectRatio: "1.5625 / 1" }}>
      <Image src={src} alt={alt} fill className="object-cover" sizes="800px" />
    </div>
  );
}

// Panoramic image — aspect ratio 2.5:1 (800px × 320px), used in Ideation
function PanoramicImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-[16px]" style={{ aspectRatio: "2.5 / 1" }}>
      <Image src={src} alt={alt} fill className="object-cover" sizes="800px" />
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────

export default function YouPayContent() {
  return (
    <div className="flex w-full max-w-[800px] flex-col gap-[80px]">

      {/* ── Overview ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-[48px]">

        {/* Role / Duration — two columns */}
        <div className="grid grid-cols-2 gap-[24px]">
          <div className="flex flex-col gap-[8px]">
            <span className="font-sans text-[20px] font-normal text-[#6f6f76]">Role</span>
            <span className="font-sans text-[18px] font-normal text-primary">UX | UI Designer</span>
          </div>
          <div className="flex flex-col gap-[8px]">
            <span className="font-sans text-[20px] font-normal text-[#6f6f76]">Duration</span>
            <span className="font-sans text-[18px] font-normal text-primary">2 weeks (June 2023)</span>
          </div>
        </div>

        {/* Project overview */}
        <div className="flex flex-col gap-[24px]">
          <Body>
            Youpay was created with the aim of automating the invoice process for schools.
            With its expansion, its solutions have evolved to centralize the financial
            management of the clients in one place.
          </Body>
          <Body>
            I joined the product team at Youpay with the mission to design the experience
            of its solutions. In this project, as the only designer, I decided to involve
            the programmers and support teams closely in my design process.
          </Body>
        </div>
      </div>

      {/* ── Context ───────────────────────────────────────────────────────── */}
      <section id="context" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>Context</SectionHeading>
        <Body>
          With the prioritization of building new features, the payment flow had been out
          of date and unoptimized for business metrics. As the main flow of the platform,
          we feel the necessity to give more attention to it.
        </Body>
        <Body>
          To understand our ecosystem, the majority of schools have sent their charges as
          bank slips to the students' parents. With Youpay, the charge is sent monthly as
          an invoice link, and in addition to bank slips, there are also available payments
          with a credit card and Pix (an instant bank transfer method in Brazil).
        </Body>
        <ContentImage src={IMG.context} alt="Youpay platform context — payment flow overview" />
      </section>

      {/* ── Challenge ─────────────────────────────────────────────────────── */}
      <section id="challenge" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>Challenge</SectionHeading>
        <Callout>
          <em>
            How can we reduce payment fees and build our brand connection through our
            products, avoiding mischaracterizing the school's identity?
          </em>
        </Callout>
        <Body>
          Each payment method has a service fee, with bank slips having the highest
          operating cost.
        </Body>
        <Body>
          Besides having the highest compensation period — which takes until 72 hours —
          the bank slip also has multiple security steps in its flow, making the payment
          process slower and tiring for users. In this manner, changing the payment pattern
          to other methods would be healthier for Youpay, as well as for schools and parents.
        </Body>
      </section>

      {/* ── Solution ──────────────────────────────────────────────────────── */}
      <section id="solution" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>Solution</SectionHeading>
        <Body>
          Redesign the payment flow, giving more emphasis to payment methods that are
          faster and more rentable.
        </Body>
        <Body>
          For this purpose, a style guide was created, establishing a pattern for all
          experiences through the products and reinforcing Youpay's brand without distorting
          the identification of schools, once the users of this flow were schools' clients.
        </Body>
        <Callout>
          <em>
            To solve the challenge, the entire payment flow was redesigned with a new
            visual identity, prioritizing the Pix payment method.
          </em>
        </Callout>
        <ContentImage src={IMG.solution} alt="Youpay redesigned payment flow — solution overview" />
      </section>

      {/* ── Discovery ─────────────────────────────────────────────────────── */}
      <section id="discovery" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>Discovery</SectionHeading>
        <Body>
          Analyzing the data on payments received in the 2nd quarter of 2023 through the
          platform, I could notice that 80% of all payments were made by bank slips, and
          also that 97% of all traffic came from mobile devices, even though the page
          hadn't had a good responsive design.
        </Body>
        <Body>
          To contextualize the data, together with the support team, I collected the most
          common feedbacks from schools and students' parents about the payment process.
        </Body>
        <div className="flex flex-col gap-[16px]">
          <TakeawaysLabel />
          <ul className="flex flex-col gap-[12px]">
            <Takeaway>
              Lack of information about payment fees and discounts, which created support
              calls from students' parents with questions about the price of tuition.
            </Takeaway>
            <Takeaway>
              Outdated and aggressive visual, resulting in the resistance of new users to
              distrust if the pages were official from their schools.
            </Takeaway>
            <Takeaway>
              After being used to schools using bank slips, when users started to use
              Youpay they just replicated this behavior.
            </Takeaway>
            <Takeaway>
              The lack of responsive design on the pages made readability difficult on
              mobile devices, which — combined with a critical payment flow — resulted in
              users' fear of making mistakes, so they preferred to choose a familiar path.
            </Takeaway>
          </ul>
        </div>
        <ContentImage src={IMG.discovery} alt="Discovery — payment data analysis Q2 2023" />
      </section>

      {/* ── Ideation ──────────────────────────────────────────────────────── */}
      <section id="ideation" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>Ideation</SectionHeading>
        <Body>
          The first step was to talk with the programmers' team to understand the business
          rules behind each payment method in the flow. For each method, a different group
          of information was requested to create the charge safely.
        </Body>
        <Body>
          With the business rules crystal clear, it was time to build the users flow,
          starting from the moment they receive the payment link, until the success
          feedback for each of the payment methods.
        </Body>
        <PanoramicImage src={IMG.ideation} alt="User flow mapping — all payment methods" />
        <Callout>
          Analyzing the flow, it's clear that the Pix method has a shorter and more
          efficient path, combined with the lowest service fees between the three methods.{" "}
          <strong>We have found our golden path!</strong>
        </Callout>
      </section>

      {/* ── Prototype ─────────────────────────────────────────────────────── */}
      <section id="prototype" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>Prototyping</SectionHeading>
        <Body>
          Now it's time to scribble some ideas to lead the users down this golden path.
        </Body>
        <ContentImage src={IMG.prototype1} alt="Wireframe sketches — initial ideas" />
        <Body>
          To avoid a big relearn process and consequently some frustration from the users,
          the wireframes were designed to be simple and familiar.
        </Body>
        <ContentImage src={IMG.prototype2} alt="Wireframe screens — payment flow" />
        <Body>
          With the screens designed and validated technically for the team, it was time to
          evolve the design for high fidelity. For that, I created a style guide that,
          in the future, would become the base for the first design system of the company.
        </Body>
        <ContentImage src={IMG.prototype3} alt="High fidelity prototype — payment flow" />
      </section>

      {/* ── Release ───────────────────────────────────────────────────────── */}
      <section id="release" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>Releasing the update</SectionHeading>
        <Body>
          Before this step, it is usually recommended to do a usability test with real
          users and capture feedback to improve the flow and screens. However, because of
          the short window to launch the project and considering the changes proposed and
          the current flow, we decided to launch the product and monitor the user behavior
          during a period of low demand.
        </Body>
        <Body>
          Beyond the internal metrics of platform use, I also captured some user feedback
          together with the support team, and could extract the following learnings:
        </Body>
        <ul className="flex flex-col gap-[12px]">
          <Takeaway>
            We received positive feedbacks about the pages' visuals and the facility to
            read the information.
          </Takeaway>
          <Takeaway>
            The amount of calls with questions about the price of tuition decreased
            significantly.
          </Takeaway>
          <Takeaway>
            None changes were noticed in users' behavior, keeping the payment by bank slips
            around 80%.
          </Takeaway>
        </ul>
      </section>

      {/* ── Improvement ───────────────────────────────────────────────────── */}
      <section id="improvement" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>Improving the solution</SectionHeading>
        <Body>
          Part of the task was done, but our main goal wasn't reached yet, so I went back
          to analyze the layout and the data I had. Looking to make the Pix method more
          attractive and persuasive, I applied some psychology concepts:
        </Body>
        <div className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[8px]">
            <p className="font-sans text-[20px] font-bold leading-[1.5] text-primary">
              Turn Pix the default option
            </p>
            <Body>
              Users tend to accept the default option to avoid risks and because it is more
              convenient.
            </Body>
          </div>
          <div className="flex flex-col gap-[8px]">
            <p className="font-sans text-[20px] font-bold leading-[1.5] text-primary">
              Giving more emphasis
            </p>
            <Body>
              The colors and visual hierarchy build a bigger contrast for this option.
            </Body>
          </div>
          <div className="flex flex-col gap-[8px]">
            <p className="font-sans text-[20px] font-bold leading-[1.5] text-primary">
              Adding a &ldquo;recommended&rdquo; tag
            </p>
            <Body>
              The tag makes the option more persuasive, leading the user to a more
              advantageous choice.
            </Body>
          </div>
          <div className="flex flex-col gap-[8px]">
            <p className="font-sans text-[20px] font-bold leading-[1.5] text-primary">
              Increasing the title length
            </p>
            <Body>
              With just three letters, the title could transmit less credibility. I changed
              the button text from &ldquo;Pix&rdquo; to &ldquo;Pay with Pix&rdquo;.
            </Body>
          </div>
        </div>
        <ContentImage src={IMG.improvement} alt="Improvement — Pix emphasis redesign" />
      </section>

      {/* ── Impact ────────────────────────────────────────────────────────── */}
      <section id="impact" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>The impact</SectionHeading>
        <Body>After launching these little changes, we finally reached our goal:</Body>

        <ul className="flex flex-col gap-[12px]">
          <Takeaway>
            23% of all payments were converted to Pix in the first month after the update.
          </Takeaway>
        </ul>

        <Body>
          Unfortunately, in my position, I didn't have access to precise information about
          the company's revenue, but in feedback with the stakeholders, I could confirm
          that the update's impact was expressive and very positive for business.
        </Body>

        {/* Research with schools */}
        <Body>
          To understand the schools' feelings after the first payment window, we did
          quantitative research with 26 schools' customer services.
        </Body>
        <div className="flex flex-col gap-[16px]">
          <TakeawaysLabel />
          <ul className="flex flex-col gap-[12px]">
            <Takeaway>
              81% noticed an improvement in the parents' doubts about the tuition price.
            </Takeaway>
            <Takeaway>
              58% reported calls from parents with questions about the update.
            </Takeaway>
          </ul>
        </div>
        <Body>
          That shows us the necessity of creating a release policy, giving more instructions
          to the users, and preparing the schools to deal with possible questions.
        </Body>

        {/* Research with parents */}
        <Body>
          Repeating the process, but this time with 19 parents, we extracted the following
          learnings:
        </Body>
        <div className="flex flex-col gap-[16px]">
          <TakeawaysLabel />
          <ul className="flex flex-col gap-[12px]">
            <Takeaway>
              73% declared their preference for the new flow or that it doesn't make much
              difference for them.
            </Takeaway>
            <Takeaway>
              31% said the credit card payment flow is still problematic.
            </Takeaway>
          </ul>
        </div>
        <Body>
          The limitation of the credit card flow was already known, but the research
          reinforced even more the necessity to review this experience in the future.
          Therefore, we declared the project as "finished", but there are some points to
          be better explored in future opportunities. And, to equip our team with data,
          I asked the tech team to keep tracking data about the chosen payment methods,
          the average time spent in the flow, and the abandonment rate for each method.
        </Body>
      </section>

      {/* ── My reflection ─────────────────────────────────────────────────── */}
      <section id="reflection" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>My reflection</SectionHeading>
        <Body>
          The process was challenging, specially for being the only designer in the
          company, which made me bring the other areas closer in my design process — after
          all, my team is every person in the company. This experience was a lesson that
          I carry with me for the future.
        </Body>
        <Body>
          I had to leave my comfort zone by not doing the usability tests. It was necessary
          to create an after-launch monitoring strategy, which was totally new for me. It
          was a risk, but a conscious one, necessary for our scenario. I had to thank my
          manager for helping me in this process. Thanks, Marcus!
        </Body>
        <Body>
          Finally, the project reinforced something that I always bring with me: the details
          make all the difference. Redesigning all the payment flow was essential to
          rebuilding the experience, but in the end, the outline of a button made all the
          difference in achieving our main goal.
        </Body>
      </section>

    </div>
  );
}
