export const detailsList=['prepTime','exp','skill','cousine','type'];
export const iconsByType={
    prepTime: 'fire',
    exp: 'badge',
    skill: 'energy',
    cousine: 'chemistry',
    type: 'drop',
};

export default [
    
    {
        image: require('../assets/1.png'),
        title: 'Ultimate chocolate cake',
        description: "With a super moist crumb and fudgy, yet light texture, this chocolate cake recipe will soon be your favorite too",
        prepTime: '2 hours',
        exp: '20',
        skill: 'easy',
        cousine: 'Nouvelle',
        type: 'fast food',
    },
    {
        image: require('../assets/2.png'),
        title: 'Chilli con carne',
        description: "Chili con carne is a Mexican stew of cubed chuck beef in chili sauce, not a Ragu. There is a big difference between Chili con carne and Texas Chili. ",
        prepTime: '1.5 hours',
        exp: '15',
        skill: 'medium',
        cousine: 'Non-veg',
        type: 'meal',
    },
    {
        image: require('../assets/3.png'),
        title: 'drizzle cake',
        description: "Lemon drizzle cake is thought to be an English invention going back at least a few hundred years",
        prepTime: '1 hour',
        exp: '10',
        skill: 'easy',
        cousine: 'Vegan',
        type: 'dehydrated',
    },
]