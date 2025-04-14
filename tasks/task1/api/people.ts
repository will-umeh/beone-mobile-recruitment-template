const people = [
    {
        firstName: 'Fiona',
        lastName: 'Lubina',
        title: 'Legacy Group Strategist',
        type: 'Analyst',
    },
    {
        firstName: 'Jasmina',
        lastName: 'Roleder',
        title: 'District Brand Coordinator',
        type: 'Officer',
    },
    {
        firstName: 'Curt',
        lastName: 'Leyckes',
        title: 'Investor Configuration Producer',
        type: 'Producer',
    },
    {
        firstName: 'Hannes',
        lastName: 'Galander',
        title: 'Product Web Executive',
        type: 'Administrator',
    },
    {
        firstName: 'Kevin',
        lastName: 'Heinemann',
        title: 'Regional Interactions Representative',
        type: 'Officer',
    },
];

export type Person = (typeof people)[number];
export const fetchPeople = () => Promise.resolve(people);
