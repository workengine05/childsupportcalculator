export type State = {
  name: string;
  slug: string;
  content: {
    intro: string;
    howItWorks: string;
    updates2025: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  calculatorConfig: {};
};

const stateNames = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const generateFaqs = (stateName: string) => [
  {
    question: `What is the formula for child support in ${stateName}?`,
    answer: `${stateName} primarily uses the "Income Shares Model" to calculate child support. This model estimates the total amount that parents would spend on a child in an intact family and then divides this amount between the parents based on their respective incomes.`
  },
  {
    question: `How are healthcare and childcare costs handled in ${stateName}?`,
    answer: `In ${stateName}, costs for health insurance premiums and work-related childcare are typically added to the basic child support obligation and are prorated between the parents based on their income.`
  },
  {
    question: `Can we agree to a different amount in ${stateName}?`,
    answer: `Parents in ${stateName} can agree to a child support amount that deviates from the state guideline, but it must be approved by a judge. The court will only approve it if the agreement is deemed to be in the best interest of the child.`
  }
];

export const states: State[] = stateNames.map(name => {
  const slug = `${name.toLowerCase().replace(/\s+/g, '-')}-child-support-calculator`;
  return {
    name,
    slug,
    content: {
      intro: `Navigate the specifics of child support in ${name}. Our calculator provides a reliable estimate based on the state's latest legal guidelines, helping you understand potential financial outcomes. ${name}'s laws aim to ensure children receive a fair level of support from both parents.`,
      howItWorks: `Child support in ${name} is calculated using the Income Shares Model, which is the most common method in the U.S. The formula considers both parents' gross monthly incomes to determine the basic support obligation. Adjustments are then made for factors like healthcare premiums, childcare costs, and the amount of time the child spends with each parent. Our calculator simplifies this by guiding you through each necessary input.`,
      updates2025: `For 2025, ${name} continues to refine its child support guidelines to ensure fairness and accuracy. While there are no major legislative overhauls announced, the economic data used to set the basic support obligations is periodically updated to reflect cost of living changes. Always check for the most current local court rules, as they can influence the final calculation.`
    },
    faqs: generateFaqs(name),
    calculatorConfig: {}
  };
});
