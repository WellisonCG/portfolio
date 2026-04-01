/*
  YouPayContent
  ─────────────────────────────────────────────────────────────────────────────
  Framer node: Content (ZzavlGnOr) inside Body (bnOciEGrP)

  Sections: #context · #challenge · #solution · #discovery · #ideation
            #prototype · #release · #improvement · #impact · #reflection
*/

"use client";

import Image, { type StaticImageData } from "next/image";
import { useLanguage } from "@/lib/language-context";
import imgContext     from "@/public/assets/youpay/youpay-image-context.png";
import imgSolution    from "@/public/assets/youpay/youpay-image-solution.png";
import imgDiscovery   from "@/public/assets/youpay/youpay-image-discovery.png";
import imgIdeation    from "@/public/assets/youpay/youpay-image-ideation.png";
import imgPrototype1  from "@/public/assets/youpay/youpay-image-prototyping.png";
import imgPrototype2  from "@/public/assets/youpay/youpay-image-prototyping-2.png";
import imgPrototype3  from "@/public/assets/youpay/youpay-image-prototyping-3.png";
import imgImprovement from "@/public/assets/youpay/youpay-image-improving.png";

// ─── Image references ──────────────────────────────────────────────────────
const IMG = {
  context:     imgContext,
  solution:    imgSolution,
  discovery:   imgDiscovery,
  ideation:    imgIdeation,
  prototype1:  imgPrototype1,
  prototype2:  imgPrototype2,
  prototype3:  imgPrototype3,
  improvement: imgImprovement,
};

// ─── Copy ──────────────────────────────────────────────────────────────────
const COPY = {
  EN: {
    labelRole:     "Role",
    labelDuration: "Duration",
    roleValue:     "UX | UI Designer",
    durationValue: "2 weeks (June 2023)",

    overview: [
      "Youpay was created with the aim of automating the invoice process for schools. With its expansion, its solutions have evolved to centralize the financial management of the clients in one place.",
      "I joined the product team at Youpay with the mission to design the experience of its solutions. In this project, as the only designer, I decided to involve the programmers and support teams closely in my design process.",
    ],

    contextHeading: "Context",
    context: [
      "With the prioritization of building new features, the payment flow had been out of date and unoptimized for business metrics. As the main flow of the platform, we feel the necessity to give more attention to it.",
      "To understand our ecosystem, the majority of schools have sent their charges as bank slips to the students' parents. With Youpay, the charge is sent monthly as an invoice link, and in addition to bank slips, there are also available payments with a credit card and Pix (an instant bank transfer method in Brazil).",
    ],

    challengeHeading: "Challenge",
    challengeCallout: "How can we reduce payment fees and build our brand connection through our products, avoiding mischaracterizing the school's identity?",
    challenge: [
      "Each payment method has a service fee, with bank slips having the highest operating cost.",
      "Besides having the highest compensation period — which takes until 72 hours — the bank slip also has multiple security steps in its flow, making the payment process slower and tiring for users. In this manner, changing the payment pattern to other methods would be healthier for Youpay, as well as for schools and parents.",
    ],

    solutionHeading: "Solution",
    solution: [
      "Redesign the payment flow, giving more emphasis to payment methods that are faster and more rentable.",
      "For this purpose, a style guide was created, establishing a pattern for all experiences through the products and reinforcing Youpay's brand without distorting the identification of schools, once the users of this flow were schools' clients.",
    ],
    solutionCallout: "To solve the challenge, the entire payment flow was redesigned with a new visual identity, prioritizing the Pix payment method.",

    discoveryHeading: "Discovery",
    discovery: [
      "Analyzing the data on payments received in the 2nd quarter of 2023 through the platform, I could notice that 80% of all payments were made by bank slips, and also that 97% of all traffic came from mobile devices, even though the page hadn't had a good responsive design.",
      "To contextualize the data, together with the support team, I collected the most common feedbacks from schools and students' parents about the payment process.",
    ],
    discoveryTakeawaysLabel: "Key Takeaways:",
    discoveryTakeaways: [
      "Lack of information about payment fees and discounts, which created support calls from students' parents with questions about the price of tuition.",
      "Outdated and aggressive visual, resulting in the resistance of new users to distrust if the pages were official from their schools.",
      "After being used to schools using bank slips, when users started to use Youpay they just replicated this behavior.",
      "The lack of responsive design on the pages made readability difficult on mobile devices, which — combined with a critical payment flow — resulted in users' fear of making mistakes, so they preferred to choose a familiar path.",
    ],

    ideationHeading: "Ideation",
    ideation: [
      "The first step was to talk with the programmers' team to understand the business rules behind each payment method in the flow. For each method, a different group of information was requested to create the charge safely.",
      "With the business rules crystal clear, it was time to build the users flow, starting from the moment they receive the payment link, until the success feedback for each of the payment methods.",
    ],
    ideationCallout: "Analyzing the flow, it's clear that the Pix method has a shorter and more efficient path, combined with the lowest service fees between the three methods. We have found our golden path!",

    prototypeHeading: "Prototyping",
    prototype: [
      "Now it's time to scribble some ideas to lead the users down this golden path.",
      "To avoid a big relearn process and consequently some frustration from the users, the wireframes were designed to be simple and familiar.",
      "With the screens designed and validated technically for the team, it was time to evolve the design for high fidelity. For that, I created a style guide that, in the future, would become the base for the first design system of the company.",
    ],

    releaseHeading: "Releasing the update",
    release: [
      "Before this step, it is usually recommended to do a usability test with real users and capture feedback to improve the flow and screens. However, because of the short window to launch the project and considering the changes proposed and the current flow, we decided to launch the product and monitor the user behavior during a period of low demand.",
      "Beyond the internal metrics of platform use, I also captured some user feedback together with the support team, and could extract the following learnings:",
    ],
    releaseTakeaways: [
      "We received positive feedback about the pages' visuals and the facility to read the information.",
      "The amount of calls with questions about the price of tuition decreased significantly.",
      "No changes were noticed in users' behavior, keeping the payment by bank slips around 80%.",
    ],

    improvementHeading: "Improving the solution",
    improvementBody: "Part of the task was done, but our main goal wasn't reached yet, so I went back to analyze the layout and the data I had. Looking to make the Pix method more attractive and persuasive, I applied some psychology concepts:",
    improvementItems: [
      { title: "Turn Pix the default option",      body: "Users tend to accept the default option to avoid risks and because it is more convenient." },
      { title: "Giving more emphasis",             body: "The colors and visual hierarchy build a bigger contrast for this option." },
      { title: 'Adding a \u201crecommended\u201d tag', body: "The tag makes the option more persuasive, leading the user to a more advantageous choice." },
      { title: "Increasing the title length",      body: 'With just three letters, the title could transmit less credibility. I changed the button text from \u201cPix\u201d to \u201cPay with Pix\u201d.' },
    ],

    impactHeading: "The impact",
    impactIntro: "After launching these little changes, we finally reached our goal:",
    impactTakeaway1: "23% of all payments were converted to Pix in the first month after the update.",
    impactBody1: "Unfortunately, in my position, I didn't have access to precise information about the company's revenue, but in feedback with the stakeholders, I could confirm that the update's impact was expressive and very positive for business.",
    impactSchoolsIntro: "To understand the schools' feelings after the first payment window, we did quantitative research with 26 schools' customer services.",
    impactTakeawaysLabel: "Key Takeaways:",
    impactSchoolsTakeaways: [
      "81% noticed an improvement in the parents' doubts about the tuition price.",
      "58% reported calls from parents with questions about the update.",
    ],
    impactSchoolsConclusion: "That shows us the necessity of creating a release policy, giving more instructions to the users, and preparing the schools to deal with possible questions.",
    impactParentsIntro: "Repeating the process, but this time with 19 parents, we extracted the following learnings:",
    impactParentsTakeaways: [
      "73% declared their preference for the new flow or that it doesn't make much difference for them.",
      "31% said the credit card payment flow is still problematicopy.",
    ],
    impactConclusion1: "The limitation of the credit card flow was already known, but the research reinforced even more the necessity to review this experience in the future.",
    impactConclusion2: 'Therefore, we declared the project as \u201cfinished\u201d, but there are some points to be better explored in future opportunities. And, to equip our team with data, I asked the tech team to keep tracking data about the chosen payment methods, the average time spent in the flow, and the abandonment rate for each method.',

    reflectionHeading: "My reflection",
    reflection: [
      "The process was challenging, especially for being the only designer in the company, which made me bring the other areas closer in my design process — after all, my team is every person in the company. This experience was a lesson that I carry with me for the future.",
      "I had to leave my comfort zone by not doing the usability tests. It was necessary to create an after-launch monitoring strategy, which was totally new for me. It was a risk, but a conscious one, necessary for our scenario. I had to thank my manager for helping me in this process. Thanks, Marcus!",
      "Finally, the project reinforced something that I always bring with me: the details make all the difference. Redesigning all the payment flow was essential to rebuilding the experience, but in the end, the outline of a button made all the difference in achieving our main goal.",
    ],
  },

  PT: {
    labelRole:     "Função",
    labelDuration: "Duração",
    roleValue:     "UX | UI Designer",
    durationValue: "2 semanas (Junho 2023)",

    overview: [
      "A Youpay nasceu com o intuito de automatizar o processo de cobrança de colégios de pequeno e médio porte. Com seu crescimento suas soluções se expandiram para centralizar a gestão financeira de seus clientes em um único local.",
      "Entrei no time de produto da Youpay com a missão de projetar a experiência dessas soluções. Nesse projeto eu estive atuando como o único designer, por esse motivo optei por trazer mais para perto do processo tanto a equipe de desenvolvedores, quanto o time de suporte ao cliente.",
    ],

    contextHeading: "Contexto",
    context: [
      "Com a priorização da construção de novas funcionalidades, a manutenção de recursos mais antigos acabaram sendo deixados em segundo plano, e dentro desses recursos, o fluxo de pagamentos. Mesmo sendo a principal funcionalidade da plataforma, o fluxo acabou ficando não só desatualizado visualmente como também pouco otimizado para as métricas do negócio.",
      "Para entender o ecossistema que estávamos inseridos, em sua maioria os colégios efetuam as cobranças através do envio de boletos para os pais de seus alunos. Ao utilizarem a Youpay, a geração e envio dessa cobrança passa a ser automática por um link enviado mensalmente, e além do boleto, também é possível efetuar o pagamento com cartão de crédito e Pix.",
    ],

    challengeHeading: "Desafio",
    challengeCallout: "Como reduzir as taxas dos pagamentos e criar uma conexão da nossa marca pelo produto sem descaracterizar a identificação dos colégios?",
    challenge: [
      "Cada método de pagamento gera uma taxa de serviço, dessa forma o custo da operação depende do padrão de comportamento dos usuários. Visto que antes de contratarem a Youpay as escolas comumente possuem apenas o boleto como método de pagamento, os usuários entram condicionados a continuarem com seu comportamento padrão.",
      "Além de ser o método de pagamento com maior custo operacional, o boleto também tem o maior tempo para a identificação do pagamento, podendo levar até 72h e possui diversas etapas de segurança que tornam o fluxo obrigatoriamente maior e mais cansativo para os usuários. Sendo assim, uma mudança no padrão de pagamento migrando para outros métodos seria benéfica não só para a Youpay, como também para as escolas e pais.",
    ],

    solutionHeading: "Solução",
    solution: [
      "Redesenhar o fluxo de pagamento dando maior destaque para métodos de pagamento mais ágeis e rentáveis.",
      "Para isso foi criado um style guide, padronizando a experiência por todos os produtos e reforçando a marca da Youpay, porém sem descaracterizar a marca das escolas, uma vez que os usuários desse fluxo são clientes da escola.",
    ],
    solutionCallout: null,

    discoveryHeading: "Descoberta",
    discovery: [
      "Ao analisar os dados pagamentos recebidos no segundo trimestre de 2023 pela plataforma, pude perceber que 80% dos pagamentos eram efetuados por boletos e que a 97% dos acessos eram de dispositivos móveis, mesmo a página atual não possuindo uma responsividade adequada.",
      "Para contextualizar os dados, juntamente com o time de suporte, coletei os feedbacks mais recorrentes de escolas e pais sobre o processo de pagamento.",
    ],
    discoveryTakeawaysLabel: "Aprendizados extraídos:",
    discoveryTakeaways: [
      "Falta de informações sobre taxas e descontos, o que gerou chamadas de suporte dos pais dos alunos com dúvidas sobre o preço da mensalidade;",
      "Visual desatualizado e agressivo, resultando na resistência de novos usuários em desconfiar se as páginas eram oficiais de suas escolas;",
      "Depois de estarem habituados às escolas utilizarem boletos bancários, quando os usuários começaram a usar o Youpay, eles apenas replicaram esse comportamento;",
      "A falta de um design responsivo nas páginas dificultou a legibilidade em dispositivos móveis, o que, combinado com um fluxo de pagamento crítico, resultou no medo dos usuários de cometer erros, então eles preferiram escolher um caminho familiar;",
    ],

    ideationHeading: "Ideação",
    ideation: [
      "O primeiro passo foi conversar com a equipe de desenvolvedores para entender quais eram as regras de negócio por trás de cada um dos métodos de pagamento dentro do fluxo. Para cada método um conjunto de informações diferentes era requisitado para gerar a cobrança de forma segura.",
      "Com as regras de negócio claras, era hora de construir o fluxo do usuário do momento em que ele recebia o link de pagamento até o feedback de sucesso para cada um desses métodos.",
    ],
    ideationCallout: "Ao analisar esse fluxo fica claro que as requisições de segurança tanto do boleto, quanto do cartão de crédito criam um caminho muito mais trabalhoso para os usuários, porém o Pix possui um fluxo visivelmente mais curto e eficiente, além de possuir a menor taxa de serviço entre os 3 métodos. Achamos o caminho dourado!",

    prototypeHeading: "Prototipação",
    prototype: [
      "Agora era hora de rabiscar as telas para direcionar os usuários até ele.",
      "Para evitar grandes reaprendizados e consequentemente uma frustração dos usuários, as wireframes foram projetadas para serem simples e familiares.",
      "Com as telas projetadas e validadas tecnicamente pela equipe, foi o momento de evoluir o projeto para alta fidelidade, para isso foi criado um guia de estilos que posteriormente seria utilizado como base para a criação do primeiro design system da Youpay.",
    ],

    releaseHeading: "Lançando o projeto",
    release: [
      "Antes dessa etapa é recomendado a validação com usuários reais, testando a usabilidade e coletando feedbacks para identificar problemas e possíveis melhorias no fluxo, porém o projeto em questão possuía um caráter atípico e precisava ser lançado rapidamente devido à janela de pagamentos. Levando em consideração as alterações propostas e o estado do fluxo atual, optamos por lançar o produto e monitorar o comportamento dos usuários em um período de baixo acesso.",
      "Além das métricas internas de uso da plataforma, também foram coletados feedbacks dos usuários por meio do canal de suporte e os seguintes aprendizados puderam ser extraídos:",
    ],
    releaseTakeaways: [
      "Recebemos feedbacks positivos sobre a parte visual das páginas e a facilidade de ler as informações;",
      "A quantidade de ligações com dúvidas sobre o preço da mensalidade diminuiu significativamente;",
      "Nenhuma mudança foi notada no comportamento dos usuários, mantendo o pagamento por boletos bancários em torno de 80%.",
    ],

    improvementHeading: "Refinando a solução",
    improvementBody: "Parte da tarefa tinha sido cumprida, porém, o principal objetivo ainda não tinha sido alcançado, com isso voltei a analisar o layout. Buscando tornar o método de pagamento por Pix mais atrativo e persuasivo, foram aplicados alguns conceitos da psicologia:",
    improvementItems: [
      { title: "Tornar o Pix a opção padrão",          body: "Usuários tendem a aceitar a opção padrão para evitar riscos e por ser mais cômoda." },
      { title: "Maior destaque",                        body: "As cores e hierarquia visual criam um contraste maior para essa opção." },
      { title: 'Adicionado uma tag de \u201crecomendado\u201d', body: "Torna a opção mais persuasiva direcionando o usuário para uma escolha com mais vantagens." },
      { title: "Aumentar o tamanho do título",          body: 'Por ter apenas 3 letras o título pode passar menos credibilidade, sendo assim foi alterado o texto do botão de apenas \u201cPix\u201d para \u201cPagar com Pix\u201d.' },
    ],

    impactHeading: "O impacto",
    impactIntro: "Lançando essas pequenas alterações finalmente conseguimos alcançar nosso objetivo:",
    impactTakeaway1: "23% dos pagamentos convertidos para Pix no primeiro mês após as alterações.",
    impactBody1: "Infelizmente em minha área eu não possuía acesso a informações mais precisas sobre o faturamento, porém em feedbacks com os sócios pude confirmar que impacto da atualização foi expressivo e muito positivo para os negócios.",
    impactSchoolsIntro: "Para capturar o sentimento das escolas, após a primeira janela de pagamentos, foi realizado uma pesquisa quantitativa com os atendimentos de 26 escolas.",
    impactTakeawaysLabel: "Aprendizados extraídos:",
    impactSchoolsTakeaways: [
      "81% relatou ter percebido uma melhora nas dúvidas dos pais sobre as taxas e valores cobrados nas mensalidades;",
      "58% relatou que tiveram contatos de pais com dúvidas relacionadas a atualização.",
    ],
    impactSchoolsConclusion: "Isso apontou a necessidade de criar uma política de lançamentos, dando mais instruções aos usuários e deixando as escolas mais preparadas para lidarem com possíveis dúvidas.",
    impactParentsIntro: "Ao realizar uma pesquisa quantitativa semelhante, mas desta vez com 19 pais, extraímos os seguintes aprendizados:",
    impactParentsTakeaways: [
      "73% declararam preferir o novo fluxo ou não fazer diferente para eles;",
      "31% comentou sobre o fluxo de pagamento por cartão de crédito ainda ser problemático.",
    ],
    impactConclusion1: "A limitação do fluxo com cartão de crédito já era conhecida, porém, a pesquisa reforçou ainda mais a necessidade de revisitar esse fluxo no futuro.",
    impactConclusion2: 'Com isso, declaramos esse projeto \u201cfinalizado\u201d, porém tendo diversos pontos a serem melhor explorados em futuras oportunidades. Para munir nosso time com dados, pedi para continuarmos mapeando a preferência dos usuários pelas formas de pagamento, o tempo médio de permanência no fluxo e a taxa de abandono para cada um dos métodos.',

    reflectionHeading: "Meus aprendizados",
    reflection: [
      "O processo foi desafiador, principalmente por ser o único designer na empresa no momento, o que me trouxe a necessidade de estar mais próximo das outras áreas da empresa, afinal minha equipe são todos os colaboradores. Essa foi uma lição que aprendi nesse projeto e que levei para o restante da minha jornada na Youpay.",
      "Tive que sair da minha zona de conforto ao ter de abdicar dos testes de usabilidade da funcionalidade. Foi necessário criar uma estratégia de monitoramento e aprimoramento pós lançamento totalmente nova para mim, e sem sombra de dúvidas corremos um risco, porém um risco consciente e estratégico para o cenário em que estávamos, e tenho muito a agradecer ao meu gestor por me ajudar nesse processo. Valeu Marcus!!",
      "Por fim, o projeto reforçou algo que sempre carreguei comigo, detalhes fazem sim muita diferença. Mudar todo o design da página foi essencial para reconstruir a experiência, mas no fim o contorno de um botão fez toda a diferença para alcançarmos nosso objetivo primário.",
    ],
  },
} as const;

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

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l border-muted pl-[24px]">
      <p className="font-sans text-[20px] font-normal leading-[1.5] text-primary">
        {children}
      </p>
    </div>
  );
}

function Takeaway({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-[8px] font-sans text-[20px] leading-[1.5] text-muted">
      <span className="mt-[12px] h-[4px] w-[4px] shrink-0 rounded-full bg-muted" />
      <span>{children}</span>
    </li>
  );
}

function TakeawaysLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-sans text-[24px] font-normal text-muted">
      {children}
    </span>
  );
}

function ContentImage({ src, alt }: { src: StaticImageData; alt: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-[16px]" style={{ aspectRatio: "1.5625 / 1" }}>
      <Image src={src} alt={alt} fill className="object-cover" sizes="800px" placeholder="blur" />
    </div>
  );
}

function PanoramicImage({ src, alt }: { src: StaticImageData; alt: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-[16px]" style={{ aspectRatio: "2.5 / 1" }}>
      <Image src={src} alt={alt} fill className="object-cover" sizes="800px" placeholder="blur" />
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────

export default function YouPayContent() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <div className="flex w-full max-w-[800px] flex-col gap-[80px]">

      {/* ── Overview ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-[48px]">
        <div className="grid grid-cols-2 gap-[24px]">
          <div className="flex flex-col gap-[8px]">
            <span className="font-sans text-[20px] font-normal text-[#6f6f76]">{copy.labelRole}</span>
            <span className="font-sans text-[18px] font-normal text-primary">{copy.roleValue}</span>
          </div>
          <div className="flex flex-col gap-[8px]">
            <span className="font-sans text-[20px] font-normal text-[#6f6f76]">{copy.labelDuration}</span>
            <span className="font-sans text-[18px] font-normal text-primary">{copy.durationValue}</span>
          </div>
        </div>
        <div className="flex flex-col gap-[24px]">
          <Body>{copy.overview[0]}</Body>
          <Body>{copy.overview[1]}</Body>
        </div>
      </div>

      {/* ── Context ───────────────────────────────────────────────────────── */}
      <section id="context" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>{copy.contextHeading}</SectionHeading>
        <Body>{copy.context[0]}</Body>
        <Body>{copy.context[1]}</Body>
        <ContentImage src={IMG.context} alt="Screenshot of the original Youpay payment flow before the redesign, showing the outdated visual and bank slip as the default payment method" />
      </section>

      {/* ── Challenge ─────────────────────────────────────────────────────── */}
      <section id="challenge" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>{copy.challengeHeading}</SectionHeading>
        <Callout><em>{copy.challengeCallout}</em></Callout>
        <Body>{copy.challenge[0]}</Body>
        <Body>{copy.challenge[1]}</Body>
      </section>

      {/* ── Solution ──────────────────────────────────────────────────────── */}
      <section id="solution" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>{copy.solutionHeading}</SectionHeading>
        <Body>{copy.solution[0]}</Body>
        <Body>{copy.solution[1]}</Body>
        {copy.solutionCallout && (
          <Callout><em>{copy.solutionCallout}</em></Callout>
        )}
        <ContentImage src={IMG.solution} alt="Redesigned Youpay payment screens with the new visual identity, featuring Pix as the highlighted and recommended payment option" />
      </section>

      {/* ── Discovery ─────────────────────────────────────────────────────── */}
      <section id="discovery" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>{copy.discoveryHeading}</SectionHeading>
        <Body>{copy.discovery[0]}</Body>
        <Body>{copy.discovery[1]}</Body>
        <div className="flex flex-col gap-[16px]">
          <TakeawaysLabel>{copy.discoveryTakeawaysLabel}</TakeawaysLabel>
          <ul className="flex flex-col gap-[12px]">
            {copy.discoveryTakeaways.map((t, i) => <Takeaway key={i}>{t}</Takeaway>)}
          </ul>
        </div>
        <ContentImage src={IMG.discovery} alt="Data analysis dashboard showing 80% of payments made via bank slip and 97% of traffic coming from mobile devices in Q2 2023" />
      </section>

      {/* ── Ideation ──────────────────────────────────────────────────────── */}
      <section id="ideation" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>{copy.ideationHeading}</SectionHeading>
        <Body>{copy.ideation[0]}</Body>
        <Body>{copy.ideation[1]}</Body>
        <PanoramicImage src={IMG.ideation} alt="User flow diagram mapping all three payment paths from receiving the payment link through to success confirmation: bank slip, credit card, and Pix" />
        <Callout>{copy.ideationCallout}</Callout>
      </section>

      {/* ── Prototype ─────────────────────────────────────────────────────── */}
      <section id="prototype" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>{copy.prototypeHeading}</SectionHeading>
        <Body>{copy.prototype[0]}</Body>
        <ContentImage src={IMG.prototype1} alt="Low fidelity wireframe sketches exploring layout ideas for the new payment flow screens" />
        <Body>{copy.prototype[1]}</Body>
        <ContentImage src={IMG.prototype2} alt="Mid fidelity wireframe screens for the full Youpay payment flow, validated with the engineering team" />
        <Body>{copy.prototype[2]}</Body>
        <ContentImage src={IMG.prototype3} alt="High fidelity prototype screens alongside the Youpay style guide, establishing the visual foundation for the company's first design system" />
      </section>

      {/* ── Release ───────────────────────────────────────────────────────── */}
      <section id="release" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>{copy.releaseHeading}</SectionHeading>
        <Body>{copy.release[0]}</Body>
        <Body>{copy.release[1]}</Body>
        <ul className="flex flex-col gap-[12px]">
          {copy.releaseTakeaways.map((t, i) => <Takeaway key={i}>{t}</Takeaway>)}
        </ul>
      </section>

      {/* ── Improvement ───────────────────────────────────────────────────── */}
      <section id="improvement" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>{copy.improvementHeading}</SectionHeading>
        <Body>{copy.improvementBody}</Body>
        <div className="flex flex-col gap-[32px]">
          {copy.improvementItems.map((item, i) => (
            <div key={i} className="flex flex-col gap-[8px]">
              <p className="font-sans text-[20px] font-bold leading-[1.5] text-primary">{item.title}</p>
              <Body>{item.body}</Body>
            </div>
          ))}
        </div>
        <ContentImage src={IMG.improvement} alt="Revised payment screen with Pix set as the default option, a recommended tag, stronger visual contrast, and the updated button label 'Pay with Pix'" />
      </section>

      {/* ── Impact ────────────────────────────────────────────────────────── */}
      <section id="impact" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>{copy.impactHeading}</SectionHeading>
        <Body>{copy.impactIntro}</Body>
        <ul className="flex flex-col gap-[12px]">
          <Takeaway>{copy.impactTakeaway1}</Takeaway>
        </ul>
        <Body>{copy.impactBody1}</Body>
        <Body>{copy.impactSchoolsIntro}</Body>
        <div className="flex flex-col gap-[16px]">
          <TakeawaysLabel>{copy.impactTakeawaysLabel}</TakeawaysLabel>
          <ul className="flex flex-col gap-[12px]">
            {copy.impactSchoolsTakeaways.map((t, i) => <Takeaway key={i}>{t}</Takeaway>)}
          </ul>
        </div>
        <Body>{copy.impactSchoolsConclusion}</Body>
        <Body>{copy.impactParentsIntro}</Body>
        <div className="flex flex-col gap-[16px]">
          <TakeawaysLabel>{copy.impactTakeawaysLabel}</TakeawaysLabel>
          <ul className="flex flex-col gap-[12px]">
            {copy.impactParentsTakeaways.map((t, i) => <Takeaway key={i}>{t}</Takeaway>)}
          </ul>
        </div>
        <Body>{copy.impactConclusion1}</Body>
        <Body>{copy.impactConclusion2}</Body>
      </section>

      {/* ── My reflection ─────────────────────────────────────────────────── */}
      <section id="reflection" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>{copy.reflectionHeading}</SectionHeading>
        {copy.reflection.map((p, i) => <Body key={i}>{p}</Body>)}
      </section>

    </div>
  );
}
