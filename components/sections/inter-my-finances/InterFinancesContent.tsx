/*
  InterFinancesContent
  ─────────────────────────────────────────────────────────────────────────────
  Article body for the Inter My Finances case study.

  Sections: Context · Challenge · Solution · Discovery · Validation ·
            Ideation · Prototyping · Usability Tests · Impact
*/

"use client";

import Image, { type StaticImageData } from "next/image";
import { useLanguage } from "@/lib/language-context";
import imgSolution      from "@/public/assets/inter/inter-image-solution.png";
import imgValidation1   from "@/public/assets/inter/inter-image-validation-1.png";
import imgValidation2   from "@/public/assets/inter/inter-image-validation-2.png";
import imgValidation3   from "@/public/assets/inter/inter-image-validation-3.png";
import imgIdeation1     from "@/public/assets/inter/inter-image-ideation.png";
import imgIdeation2     from "@/public/assets/inter/inter-image-ideation-2.png";
import imgIdeation3     from "@/public/assets/inter/inter-image-ideation-3.png";
import imgPrototype1    from "@/public/assets/inter/inter-image-prototyping.png";
import imgPrototype2    from "@/public/assets/inter/inter-image-prototyping-2.png";
import imgUsability     from "@/public/assets/inter/inter-image-usability.png";
import imgImpact        from "@/public/assets/inter/inter-image-impact.png";
import personaLuizao   from "@/public/assets/inter/persona-luizao.png";
import personaKatia    from "@/public/assets/inter/persona-katia.png";

// ─── Image references ──────────────────────────────────────────────────────
const IMG = {
  solution:       imgSolution,
  validation1:    imgValidation1,
  validation2:    imgValidation2,
  validation3:    imgValidation3,
  ideation1:      imgIdeation1,
  ideation2:      imgIdeation2,
  ideation3:      imgIdeation3,
  prototype1:     imgPrototype1,
  prototype2:     imgPrototype2,
  usabilityTests: imgUsability,
  impact:         imgImpact,

};

const PERSONA_LUIZAO = personaLuizao;
const PERSONA_KATIA  = personaKatia;

// ─── Copy ──────────────────────────────────────────────────────────────────
const COPY = {
  EN: {
    labelRole:     "Role",
    labelDuration: "Duration",
    roleValue:     "UX | UI Designer",
    durationValue: "3 months (July 2021)",

    overviewBody1: "Inter My Finances is the final project of my UX Design specialization on Program UX Unicorn. The objective was put in practice the UX methodologies in a real problem, that way, with my team, we chose the Banco Inter (a Brazilian digital bank) as a start point, to have a real client with real data.",
    overviewBody2Prefix: "During this article I will focus on my contributions in the project, although I need to thank and acknowledge the exceptional work of all my team. Special thanks to",
    overviewBody2Suffix: ".",

    contextHeading: "Context",
    contextBody1Pre:  "In 2020 the Brazilian financial sector had a big growth, especially some fintechs. Despite the Covid pandemic, these companies grew by around 34%. In turn, the Banco Inter in its operational report from the same year announced a",
    contextBody1Bold: "108% growth in the accounts number",
    contextBody1Post: "in comparison to the previous year.",
    contextBody2Pre:  "However, research by CNDL/SPC Brasil showed us that",
    contextBody2Bold1:"48% of Brazilians don\u2019t control their expenses",
    contextBody2Mid:  "and the other 52%, that has some financial control, don\u2019t do this in a right manner. In addition, with the pandemic\u2019s impact, 80% of Brazilians had their finances even more affected, getting the scenario worse and reinforcing the importance to control expenses.",

    challengeHeading: "Challenge",
    challengeCallout: "How can we offer a personal financial management to collaborate with the optimization of expenses and to improve the quality of life from the customers of Banco Inter.",
    challengeBody: "The Banco Inter has as slogan \u201cCreate what makes people\u2019s life easier\u201d and, to achieve this mission, it offers features as cashback and financial investments, although it didn\u2019t have any solution for expenses management and planning goals.",

    solutionHeading: "Solution",
    solutionCallout: "Provide an area for user expense control, integrated with the differentials offered by Inter to accelerate the personal goals of its customers.",
    solutionBody: "By providing a better view of expenses and earnings, Banco Inter users are benefited from keeping their finances centralized in just one place, resulting in greater exposure to other services organically, and increased interest in staying within this ecosystem, also benefiting the institution.",

    discoveryHeading: "Discovery",
    discoveryBody: "Starting from a better view of the market and with the projected objectives, we developed the personas of our users. Based on them, we were able to identify the main difficulties and complaints of our target audience, in terms of financial planning, as well as thinking about opportunities and solutions to solve their pains.",

    personaLuizaoQuote: "I try to take notes of everything, but I always lose myself. Wasn\u2019t suppose my bills been this much\u2026",
    personaLuizaoAge:   "20 years",
    personaLuizaoOcc:   "Mall Salesman",
    personaLuizaoEdu:   "Enrolled in Biology",
    personaLuizaoSal:   "R$ 1.500/m + commissions",
    personaLuizaoPains: [
      "Doesn\u2019t know how he spends so much money;",
      "No patience to update his expenses record;",
      "Insecure about his financial future;",
      "Wishes to save money for studying abroad.",
    ],
    personaLuizaoPainkillers: [
      "Intuitive and constantly updated management;",
      "Optimized updating through bank statements;",
      "Long-term financial planning;",
      "Tracking of goals and objectives.",
    ],

    personaKatiaQuote: "I would like to have my financial independence, but I\u2019m living paycheck to paycheck...",
    personaKatiaAge:   "32 years",
    personaKatiaOcc:   "Social Media",
    personaKatiaEdu:   "Advertising degree",
    personaKatiaSal:   "R$ 2.500/m",
    personaKatiaPains: [
      "Lacks patience with management apps;",
      "Struggles to organize bills;",
      "Complains about high bank fees and slow customer service;",
      "Sometimes needs family help to pay rent;",
      "Wishes to buy a house, but doesn\u2019t have enough money.",
    ],
    personaKatiaPainkillers: [
      "Intuitive and easy-to-navigate app;",
      "Payment due date alerts;",
      "Fee-free digital account, swift virtual assistance;",
      "Expense management by category and checklist of paid bills;",
      "Assistance in saving money and buying the house.",
    ],

    labelAge:       "Age:",
    labelOccupation:"Occupation:",
    labelEducation: "Educational Level:",
    labelSalary:    "Salary:",
    labelPains:     "Pains",
    labelPainkillers:"Painkillers",

    validationHeading: "Validation",
    validationBody1: "With the personas created, we started to create our hypotheses about the financial behavior of our audience.",
    validationBody2: "Based on the research, it was natural to conclude that some scenarios were almost right:",
    validationHyp: [
      "Brazilians, in general, do not have financial planning;",
      "In most budgets, there is no money left after paying expenses;",
      "People rarely keep money for an emergency or a personal goal.",
    ],
    validationBody3: "This and other hypotheses were tested with a quantitative survey. After capturing 149 responses, we were able to analyze and even be surprised at how wrong we were:",
    validationResults: [
      "90% of interviewed were doing some financial planning;",
      "87% of respondents declared to have at least a little money left at the end of the month;",
      "77% of respondents had a reserve of money.",
    ],
    validationBody4: "After the research results, it was necessary to better understand the financial behavior of the interviewed, but also the behavior of real users of Banco Inter, so we conducted a qualitative survey with some of the respondents.",
    validationBody5: "Before talking about the learnings from this stage, I just want to point out how nervous and excited I was in these first interviews, it was the first user interview of my career and I keep this memory with much affection.",
    validationBody6: "Getting back to the data! \uD83D\uDE0A",
    validationBody7: "After exploring the financial daily life of the interviewed more closely, we noticed that the real scenario was different from the sample collected in the quantitative survey, probably because were closed questions. By talking to 6 participants from the first survey, we were able to extract the following learnings:",
    validationLearnings: [
      "In general, financial planning was done manually, which generated a huge amount of work to track expenses, discouraging the interviewed to the point of giving up after a few months;",
      "Banco Inter users did not use many other Bank features besides credit card and transfers;",
      "Although they reported having a money reserve, respondents generally had difficulty saving money and reaching their financial goals;",
      "When asked about the use of an app to make the management easier, most did not show interest, and few who had already used it declared not to feel comfortable sharing their financial data with third-party apps.",
    ],

    ideationHeading: "Ideation",
    ideationBody1: "After the research phase, it became clear that our efforts should be put into creating a solution that did not require repetitive effort from the user into adding expenses, that was simple, intuitive, and that would make better use of the various resources offered by Banco Inter.",
    ideationBody2: "Time to roll up your sleeves and sketch out the first ideas!",
    ideationBody3: "Since we still had plenty of time and wanted to experience all stages of a project, we decided to conduct a usability test at this stage to validate our proposals. We embraced the truest UX clich\u00e9, \u201cfail fast to learn fast\u201d.",
    ideationBody4: "The proposal was to give Inter users a view of everything that came in and went out during the month, mapping expenses through the use of the account, providing an area for them to create personal goals and set spending limits for the categories already existing on their credit card.",
    ideationBody5: "The tests were successful, and revealed only small points of improvement in some interactions on the home page. With this, the solution was evolved and the user flow was designed.",

    prototypeHeading: "Prototyping",
    prototypeBody1: "To standardize all screens, a style guide was created based on the identity already used by Inter in its application.",
    prototypeBody2: "In this stage, I particularly had some difficulty, as Inter itself uses various design patterns for its products, creating some inconsistencies, so I chose to focus on the most recurring patterns and create a reduced version of the Style Guide used by the brand.",
    prototypeBody3: "To carry out the final usability tests, the flow screens were evolved to high fidelity and then prototyped.",

    usabilityHeading: "Usability Tests",
    usabilityBody1: "As in the first test stage, we created a test script with some tasks for the users, and we followed a model of an interviewer and someone to listen carefully and take notes.",
    usabilityBody2: "We tested our prototype with eleven people, divided in two different groups: one group for the expenses and earnings journey and the other for the goals and the month planning journey. As the first tests, we were able to find some improvement points, so we were fixing the big problems and testing to refine the journeys.",
    usabilityTakeawaysLabel: "Key Takeaways:",
    usabilityTakeaways: [
      "Rename and redesign the main card to help users to find our feature at the app\u2019s homepage;",
      "Refine the \u201cIncome\u201d section, to make it easier for users to distinguish between received incomes and future incomes;",
      "Adjust the copywriting of all flow to match with used terms from interviews during the tests.",
    ],
    usabilityBody3: "After all changes, we had our solution for release, besides offering a simple planning system to the users, we also helped them achieve their objectives with investment tips based on their profile and giving them products with cashback based on their personal goals.",

    impactHeading: "The impact",
    impactBody1: "Being a study project, the main positive impact was practicing and applying what we learned during the program, but we also had to present it for UX professionals that would judge our skills and work.",
    impactBody2: "Max score on the project!! \uD83C\uDF89",
    impactBody3: "Certainly a great sense of achievement and pride between the entire team. As my first experience in the area, it was a huge learning process. I was happy to try many frameworks and methodologies in a single project, there\u2019s no doubt that helped me to define my design process that I still improve and use nowadays.",
  },

  PT: {
    labelRole:     "Função",
    labelDuration: "Duração",
    roleValue:     "UX | UI Designer",
    durationValue: "3 meses (Julho 2021)",

    overviewBody1: "Inter My Finances é o projeto final da minha especialização em UX Design feito no Programa UX Unicórnio.  O objetivo do projeto era colocar em prática toda a metodologia de criação de um projeto de UX para um problema real, dessa forma, com minha equipe, escolhi o Banco Inter como instituição base para iniciarmos, com isso teríamos dados reais para nossos cenários.",
    overviewBody2Prefix: "Durante esse artigo focarei mais nas minhas contribuições dentro do projeto, porém gostaria de agradecer e pontuar o trabalho excepcional de toda minha equipe. Agradecimentos especiais para",
    overviewBody2Suffix: ".",

    contextHeading: "Contexto",
    contextBody1Pre:  "Em 2020 o mercado financeiro do Brasil se amplia continuamente, principalmente no ramo das fintechs, onde mesmo com a pandemia do Covid essas empresas cresceram cerca de 34%. Por sua vez, o Banco Inter em seu relatório operacional do mesmo ano reportou o",
    contextBody1Bold: "aumento de 108% no número de contas",
    contextBody1Post: "em relação ao ano anterior.",
    contextBody2Pre:  "Em contrapartida, a pesquisa realizada pela CNDL/SPC Brasil mostrava que",
    contextBody2Bold1:"48% dos brasileiros não controlam os próprios gastos",
    contextBody2Mid:  "e os 52% restantes, que possuem algum tipo de controle, nem sempre o fazem de forma adequada. Além disso, com os impactos causados pela pandemia, 80% dos brasileiros tiveram suas finanças ainda mais afetadas, agravando o cenário do contexto apresentado e reforçando ainda mais a importância da contenção de despesas.",

    challengeHeading: "Desafio",
    challengeCallout: "Como podemos oferecer um gerenciamento financeiro pessoal para colaborar com a diminuição de gastos e com a melhoria da qualidade de vida dos clientes do Banco Inter?",
    challengeBody: "O banco Inter tem como lema \u201cCriar o que simplifica a vida das pessoas\u201d e busca, através disso, oferece funcionalidades como de economia de dinheiro (cashback) e rendimentos (investimentos e poupança), porém não possuía uma solução para a gestão de gastos e planejamento de metas.",

    solutionHeading: "Solução",
    solutionCallout: "Disponibilizar uma área para controle de despesas dos usuários, integrado aos diferenciais oferecidos pelo Inter para acelerar as metas pessoais de seus clientes.",
    solutionBody: "Ao disponibilizar uma melhor visualização das entradas e saídas, os usuários do Banco Inter passam a ter um benefício por manter seu financeiro centralizado em apenas um lugar, resultando na maior exposição a outros serviços de forma orgânica, e no maior interesse em continuar inserido dentro desse ecossistema, beneficiando também a instituição.",

    discoveryHeading: "Descoberta",
    discoveryBody: "A partir de uma melhor visão do mercado e com os objetivos projetados, desenvolvemos as personas dos nossos usuários. Baseados nelas, pudemos identificar quais as principais dificuldades e queixas do nosso público alvo, no que se refere ao planejamento financeiro, bem como pensar em oportunidades e soluções para sarar suas dores.",

    personaLuizaoQuote: "Tento anotar tudo, mas sempre me perco. Não era pra fatura vir tanto...",
    personaLuizaoAge:   "20 anos",
    personaLuizaoOcc:   "Vendedor em shopping",
    personaLuizaoEdu:   "Cursando biologia",
    personaLuizaoSal:   "R$ 1.500 + comissões",
    personaLuizaoPains: [
      "Não sabe como gasta tanto dinheiro;",
      "Sem paciência para atualizar seu registro de despesas;",
      "Inseguro em relação ao seu futuro financeiro;",
      "Deseja economizar dinheiro para um intercâmbio.",
    ],
    personaLuizaoPainkillers: [
      "Gerenciamento intuitivo e constantemente atualizado;",
      "Atualização otimizada por meio de extratos bancários;",
      "Planejamento financeiro de longo prazo;",
      "Acompanhamento de metas e objetivos.",
    ],

    personaKatiaQuote: "Gostaria de ter minha independência financeira, mas vivo com a corda no pescoço...",
    personaKatiaAge:   "32 anos",
    personaKatiaOcc:   "Social Media",
    personaKatiaEdu:   "Publicitária",
    personaKatiaSal:   "R$ 2.500",
    personaKatiaPains: [
      "Pouca paciência com aplicativos de gerenciamento;",
      "Tem dificuldade para organizar as contas;",
      "Reclama de taxas altas e atendimento lento;",
      "Às vezes precisa de ajuda da família para pagar o aluguel;",
      "Deseja comprar uma casa, mas não tem dinheiro suficiente.",
    ],
    personaKatiaPainkillers: [
      "Aplicativo intuitivo e fácil de navegar;",
      "Alertas de vencimento de pagamento;",
      "Conta digital sem taxa, assistência virtual ágil;",
      "Gerenciamento de despesas por categoria e lista de contas pagas;",
      "Auxílio na economia de dinheiro e na compra da casa.",
    ],

    labelAge:        "Idade:",
    labelOccupation: "Ocupação:",
    labelEducation:  "Formação:",
    labelSalary:     "Salário:",
    labelPains:      "Dores",
    labelPainkillers:"Analgésicos",

    validationHeading: "Validação",
    validationBody1: "Com as personas criadas, começamos a traçar nossas hipóteses em relação ao comportamento financeiro do nosso público.",
    validationBody2: "Baseado nas pesquisas, era natural concluir que alguns cenários fossem quase certos:",
    validationHyp: [
      "Os brasileiros, em geral, não possuem um planejamento financeiro;",
      "Na maioria dos orçamentos não sobra dinheiro após pagar as despesas;",
      "Dificilmente as pessoas possuem uma reserva de dinheiro para emergência ou planos.",
    ],
    validationBody3: "Essa e outras hipóteses foram levadas à prova por meio de uma pesquisa quantitativa. Com a captura de 149 respostas, pudemos analisar e até se espantar em como estávamos equivocados:",
    validationResults: [
      "90% dos entrevistados realizavam algum planejamento financeiro;",
      "87% dos entrevistados alegavam sobrar ao menos um pouco de dinheiro no fim do mês;",
      "77% dos entrevistados possuem uma reserva de dinheiro.",
    ],
    validationBody4: "Visto os resultados da pesquisa, foi necessário compreender melhor o comportamento financeiro desses entrevistados, mas também o comportamento de usuários reais do Banco Inter, sendo assim realizamos uma pesquisa qualitativa com alguns dos entrevistados.",
    validationBody5: "Antes de falar sobre os aprendizados dessa etapa, quero só pontuar como estava nervoso e empolgado nessas primeiras entrevistas, foi a primeira entrevista com usuários da minha carreira e guardo essa recordação com muito carinho.",
    validationBody6: "Voltando aos dados! 😅",
    validationBody7: "Ao explorar melhor o cotidiano financeiro dos entrevistados pudemos notar que na realidade o cenário real se destoava um pouco da amostragem coletada na pesquisa quantitativa, muito provavelmente por serem perguntas fechadas. Ao conversar com 6 participantes da primeira pesquisa conseguimos extrair os seguintes aprendizados:",
    validationLearnings: [
      "Em geral, o planejamento financeiro era realizado manualmente, o que gerava um trabalho enorme para o acompanhamento dos gastos, desmotivando os entrevistados a ponto de desistirem após alguns meses;",
      "Os usuários do Banco Inter não utilizavam muito outras funcionalidades do Banco além de cartão de crédito e transferências;",
      "Apesar de relatarem ter uma reserva de dinheiro, os entrevistados em geral sentiam dificuldade para guardar dinheiro e alcançar suas metas financeiras;",
      "Ao serem questionados sobre a utilização de um aplicativo para facilitar a gestão, a maioria não demonstrou interesse, e poucos que já haviam utilizado alegaram não se sentirem confortáveis em compartilhar seus dados financeiros com aplicativos de terceiros.",
    ],

    ideationHeading: "Ideação",
    ideationBody1: "Após a fase de pesquisa ficou claro que nossos esforços deveriam ser colocados na criação de uma solução que não exigisse esforço repetitivo de adicionar os gastos por parte dos usuários, que fosse simples, intuitivo e que utilizasse melhor os diversos recursos do oferecidos pelo Banco Inter.",
    ideationBody2: "Hora de colocar a mão na massa e rabiscar as primeiras ideias!",
    ideationBody3: "Como estávamos com bastante prazo ainda e queríamos experienciar todas as fases de um projeto, decidimos realizar um teste de usabilidade nesse estágio para validar nossas propostas. Abraçamos o clichê mais verdadeiro de UX, \u201cfalhar rápido para aprender rápido\u201d.",
    ideationBody4: "A proposta era entregar aos usuários do Inter uma visualização de tudo que entrou e saiu durante o mês, mapeando os gastos através do uso da conta, disponibilizar uma área para criarem metas pessoais e definirem limites de gastos para as categorias já existentes no cartão de crédito.",
    ideationBody5: "Os testes foram bem sucedidos, e revelaram apenas pequenos pontos de melhoria em algumas interações na página inicial. Com isso a solução foi evoluída e o fluxo de usuários foi desenhado.",

    prototypeHeading: "Prototipação",
    prototypeBody1: "Para a padronização de todas as telas, foi criado um style guide baseado na identidade já utilizada pelo Inter seu aplicativo.",
    prototypeBody2: "Nessa etapa, particularmente tive uma certa dificuldade, pois o próprio Inter utiliza de vários padrões de design para seus produtos, criando algumas inconsistências, então optei por focar nos padrões que mais se repetiam e criar uma versão reduzida do Style Guide utilizados pela marca.",
    prototypeBody3: "Para realizarmos os testes finais de usabilidade, as telas do fluxo foram passadas para alta fidelidade e então prototipadas.",

    usabilityHeading: "Testes de Usabilidade",
    usabilityBody1: "Assim como na primeira etapa, criamos um roteiro de testes com algumas tarefas a serem feitas pelos usuários e seguindo o mesmo modelo de entrevistas remotas com um entrevistador e um relator.",
    usabilityBody2: "Ao total testamos nosso protótipo com 11 pessoas dividindo-as em 2 grupos distintos: uma jornada de receitas, gastos e contas a pagar e outra de metas e planejamento mensal. Com isso pudemos ter uma visão geral de toda a navegação da nossa função e garantir o máximo de aprendizados possíveis.",
    usabilityTakeawaysLabel: "Aprendizados extraídos:",
    usabilityTakeaways: [
      "Renomear e realizar o redesign do card principal em evidência de forma que os usuários encontrem mais rapidamente nossa funcionalidade dentro do aplicativo;",
      "Ajustar o visual da seção de \u201cReceitas\u201d para deixar mais clara a diferença entre as informações de receitas já recebidas e os lembretes de receitas a receber;",
      "Revisar algumas palavras que demonstraram estar confusas na funcionalidade (receitas, gastos, a pagar, receitas a receber, confirmar/excluir receita a receber, nome da categoria em gastos).",
    ],
    usabilityBody3: "Com as alterações aplicadas, tínhamos nossa solução pronta para seu lançamento, onde além de fornecer um planejamento simples para os usuários, ajudávamos ele a alcançar suas metas com dicas de investimentos baseadas no seu perfil e opções de produtos relacionados à meta com cashback disponível pelo Banco Inter.",

    impactHeading: "O impacto",
    impactBody1: "Se tratando de um projeto de estudos, os impactos positivos podem ser vistos na avaliação do nosso projeto por profissionais com anos de experiência no mercado que participaram do programa UX Unicórnio.",
    impactBody2: "Nota máxima no projeto!! 😀",
    impactBody3: "Certamente foi uma sensação de dever cumprido e orgulho entre todos da equipe. Como minha primeira experiência na área, foi um processo de muito aprendizado. Fico muito feliz que pude experimentar tantos frameworks e metodologias em um único projeto, sem sombra de dúvidas isso me ajudou demais a definir o processo de design que utilizo hoje.",
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
      <p className="font-sans text-[24px] font-normal leading-[1.5] text-muted">
        {children}
      </p>
    </div>
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

function OL({ items }: { items: readonly string[] }) {
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

function UL({ items }: { items: readonly string[] }) {
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
  avatarSrc: StaticImageData;
  quote: string;
  age: string;
  occupation: string;
  education: string;
  salary: string;
  pains: readonly string[];
  painkillers: readonly string[];
  labelAge: string;
  labelOccupation: string;
  labelEducation: string;
  labelSalary: string;
  labelPains: string;
  labelPainkillers: string;
}

function PersonaCard({
  name, avatarSrc, quote, age, occupation, education, salary,
  pains, painkillers,
  labelAge, labelOccupation, labelEducation, labelSalary, labelPains, labelPainkillers,
}: PersonaCardProps) {
  const labels = [
    { label: labelAge,        value: age },
    { label: labelOccupation, value: occupation },
    { label: labelEducation,  value: education },
    { label: labelSalary,     value: salary },
  ];

  return (
    <div
      className="flex w-full flex-col overflow-hidden rounded-[16px] border border-white/10 backdrop-blur-[2px]"
      style={{ background: "linear-gradient(96deg, #191919ab 0.26%, rgba(25, 25, 25, 0.3) 96.06%)" }}
    >
      <div className="flex flex-col gap-[24px] p-[24px] sm:flex-row">
        <div className="flex shrink-0 flex-col items-center gap-[12px]">
          <div className="relative h-[122px] w-[122px] overflow-hidden rounded-[12px]">
            <Image src={avatarSrc} alt={name} fill className="object-contain" sizes="122px" placeholder="blur" />
          </div>
          <span className="font-sans text-[20px] font-bold text-primary">{name}</span>
        </div>
        <div className="flex flex-col gap-[16px]">
          <p className="font-sans text-[20px] font-normal leading-[1.5] text-muted">
            &ldquo;{quote}&rdquo;
          </p>
          <div className="grid grid-cols-2 gap-x-[24px] gap-y-[12px]">
            {labels.map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-[2px]">
                <span className="font-sans text-[14px] leading-[1.5] text-[#6f6f76]">{label}</span>
                <span className="font-sans text-[14px] leading-[1.5] text-muted">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 border-t border-white/10">
        <div className="flex flex-col gap-[16px] border-r border-white/10 p-[24px]">
          <span className="font-sans text-[20px] font-normal leading-[1.1] text-[#ff7a00]">{labelPains}</span>
          <ol className="flex flex-col gap-[8px]">
            {pains.map((pain, i) => (
              <li key={i} className="flex gap-[8px] font-sans text-[16px] leading-[1.5] text-muted">
                <span className="shrink-0 text-[#6f6f76]">{i + 1}.</span>
                <span>{pain}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex flex-col gap-[16px] p-[24px]">
          <span className="font-sans text-[20px] font-normal leading-[1.1] text-[#ff7a00]">{labelPainkillers}</span>
          <ol className="flex flex-col gap-[8px]">
            {painkillers.map((pk, i) => (
              <li key={i} className="flex gap-[8px] font-sans text-[16px] leading-[1.5] text-muted">
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
          <Body>{copy.overviewBody1}</Body>
          <Body>
            {copy.overviewBody2Prefix}{" "}
            <a href="https://www.linkedin.com/in/carolinakieling/" target="_blank" rel="noopener noreferrer" className="text-[#0099ff] underline">Carolina Kieling,</a>{" "}
            <a href="https://www.linkedin.com/in/carolbitt/" target="_blank" rel="noopener noreferrer" className="text-[#0099ff] underline">Caroline Bittencourt,</a>{" "}
            <a href="https://www.linkedin.com/in/karin-bandartchuc/" target="_blank" rel="noopener noreferrer" className="text-[#0099ff] underline">Karin Bandartchuc,</a>{" "}
            <a href="https://www.linkedin.com/in/marcelle-menezes/" target="_blank" rel="noopener noreferrer" className="text-[#0099ff] underline">Marcelle Menezes,</a>{" "}
            <a href="https://www.linkedin.com/in/sandra-yoshie-417024193" target="_blank" rel="noopener noreferrer" className="text-[#0099ff] underline">Sandra Yoshie</a>
            {copy.overviewBody2Suffix}
          </Body>
        </div>
      </div>

      {/* ── Context ───────────────────────────────────────────────────────── */}
      <section id="context" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>{copy.contextHeading}</SectionHeading>
        <div className="flex flex-col gap-[24px]">
          <Body>
            {copy.contextBody1Pre}{" "}
            <strong className="font-bold text-primary">{copy.contextBody1Bold}</strong>{" "}
            {copy.contextBody1Post}
          </Body>
          <Body>
            {copy.contextBody2Pre}{" "}
            <strong className="font-bold text-primary">{copy.contextBody2Bold1}</strong>{" "}
            {copy.contextBody2Mid}
          </Body>
        </div>
      </section>

      {/* ── Challenge ─────────────────────────────────────────────────────── */}
      <section id="challenge" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>{copy.challengeHeading}</SectionHeading>
        <Callout><em>{copy.challengeCallout}</em></Callout>
        <Body>{copy.challengeBody}</Body>
      </section>

      {/* ── Solution ──────────────────────────────────────────────────────── */}
      <section id="solution" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>{copy.solutionHeading}</SectionHeading>
        <Callout><em>{copy.solutionCallout}</em></Callout>
        <Body>{copy.solutionBody}</Body>
        <ContentImage src={IMG.solution} alt="Inter My Finances feature screens showing the expense tracking dashboard integrated with Inter's cashback and investment services" />
      </section>

      {/* ── Discovery ─────────────────────────────────────────────────────── */}
      <section id="discovery" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>{copy.discoveryHeading}</SectionHeading>
        <Body>{copy.discoveryBody}</Body>
        <PersonaCard
          name="Luizão"
          avatarSrc={PERSONA_LUIZAO}
          quote={copy.personaLuizaoQuote}
          age={copy.personaLuizaoAge}
          occupation={copy.personaLuizaoOcc}
          education={copy.personaLuizaoEdu}
          salary={copy.personaLuizaoSal}
          pains={copy.personaLuizaoPains}
          painkillers={copy.personaLuizaoPainkillers}
          labelAge={copy.labelAge}
          labelOccupation={copy.labelOccupation}
          labelEducation={copy.labelEducation}
          labelSalary={copy.labelSalary}
          labelPains={copy.labelPains}
          labelPainkillers={copy.labelPainkillers}
        />
        <PersonaCard
          name="Kátia"
          avatarSrc={PERSONA_KATIA}
          quote={copy.personaKatiaQuote}
          age={copy.personaKatiaAge}
          occupation={copy.personaKatiaOcc}
          education={copy.personaKatiaEdu}
          salary={copy.personaKatiaSal}
          pains={copy.personaKatiaPains}
          painkillers={copy.personaKatiaPainkillers}
          labelAge={copy.labelAge}
          labelOccupation={copy.labelOccupation}
          labelEducation={copy.labelEducation}
          labelSalary={copy.labelSalary}
          labelPains={copy.labelPains}
          labelPainkillers={copy.labelPainkillers}
        />
      </section>

      {/* ── Validation ────────────────────────────────────────────────────── */}
      <section id="validation" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>{copy.validationHeading}</SectionHeading>
        <Body>{copy.validationBody1}</Body>
        <ContentImage src={IMG.validation1} alt="Hypothesis mapping canvas structuring assumptions about user financial behavior and pain points to guide the research" />
        <ContentImage src={IMG.validation2} alt="Quantitative survey results revealing that 48% of Brazilians don't track their expenses and 80% had finances impacted by the pandemic" />
        <div className="flex flex-col gap-[24px]">
          <Body>{copy.validationBody2}</Body>
          <OL items={copy.validationHyp} />
          <Body>{copy.validationBody3}</Body>
          <UL items={copy.validationResults} />
          <Body>{copy.validationBody4}</Body>
        </div>
        <ContentImage src={IMG.validation3} alt="Qualitative research synthesis board with user quotes and key insights about financial management habits" />
        <div className="flex flex-col gap-[24px]">
          <Body>{copy.validationBody5}</Body>
          <Body>{copy.validationBody6}</Body>
          <Body>{copy.validationBody7}</Body>
          <OL items={copy.validationLearnings} />
        </div>
      </section>

      {/* ── Ideation ──────────────────────────────────────────────────────── */}
      <section id="ideation" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>{copy.ideationHeading}</SectionHeading>
        <div className="flex flex-col gap-[24px]">
          <Body>{copy.ideationBody1}</Body>
          <Body>{copy.ideationBody2}</Body>
        </div>
        <ContentImage src={IMG.ideation1} alt="Early ideation sketches exploring layout concepts for the personal finance management feature within the Inter app" />
        <Body>{copy.ideationBody3}</Body>
        <ContentImage src={IMG.ideation2} alt="First usability test session with paper prototypes to validate the core expense tracking concepts before moving to digital screens" />
        <div className="flex flex-col gap-[24px]">
          <Body>{copy.ideationBody4}</Body>
          <Body>{copy.ideationBody5}</Body>
        </div>
        <ContentImage src={IMG.ideation3} alt="Complete user flow diagram for the Inter My Finances feature covering onboarding, expense categorization, and goal tracking paths" />
      </section>

      {/* ── Prototyping ───────────────────────────────────────────────────── */}
      <section id="prototype" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>{copy.prototypeHeading}</SectionHeading>
        <div className="flex flex-col gap-[24px]">
          <Body>{copy.prototypeBody1}</Body>
          <Body>{copy.prototypeBody2}</Body>
        </div>
        <ContentImage src={IMG.prototype1} alt="Inter My Finances style guide defining colors, typography, and UI components aligned with Banco Inter's design language" />
        <Body>{copy.prototypeBody3}</Body>
        <ContentImage src={IMG.prototype2} alt="High fidelity prototype screens for the Inter My Finances feature showing the expense overview, category breakdown, and financial goal tracking" />
      </section>

      {/* ── Usability Tests ───────────────────────────────────────────────── */}
      <section id="usability-tests" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>{copy.usabilityHeading}</SectionHeading>
        <Body>{copy.usabilityBody1}</Body>
        <ContentImage src={IMG.usabilityTests} alt="Remote usability testing session with participants navigating the high fidelity prototype to validate the expense tracking flows" />
        <Body>{copy.usabilityBody2}</Body>
        <div className="flex flex-col gap-[16px]">
          <TakeawaysLabel>{copy.usabilityTakeawaysLabel}</TakeawaysLabel>
          <UL items={copy.usabilityTakeaways} />
        </div>
        <Body>{copy.usabilityBody3}</Body>
      </section>

      {/* ── Impact ────────────────────────────────────────────────────────── */}
      <section id="impact" className="flex flex-col gap-[32px] scroll-mt-[120px]">
        <SectionHeading>{copy.impactHeading}</SectionHeading>
        <Body>{copy.impactBody1}</Body>
        <ContentImage src={IMG.impact} alt="Final project presentation slide deck for Inter My Finances, delivered as the capstone of the UX Unicorn design specialization" />
        <div className="flex flex-col gap-[24px]">
          <Body>{copy.impactBody2}</Body>
          <Body>{copy.impactBody3}</Body>
        </div>
      </section>

    </div>
  );
}
