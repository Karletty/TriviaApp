const createCategory = (categoryQuestions, categoryAnswers) => {
    const category = {
        questions: categoryQuestions,
        answers: categoryAnswers
    };
    return category
}

const videoGamesQuestions = [
    "What company is responsible for the Type 2 Plagas outbreak in Resident Evil 5?",
    "Who is the protagonist in the game Oxenfree?",
    "What happened to the cube at the end of Season 5 in Fortnite?",
    "In minecraft. What are Creepers scared of?"
];

const videoGamesAnswers = [
    ["Tricell", "The Umbrella Corporation", "The Wesker Foundation"],
    ["Alex", "Michael", "Jonas"],
    ["It teleported", "It disappeared", "It exploded"],
    ["Ocelots and cats", "The light", "Pigs"]
];


const seriesQuestions = [
    "What are the names of the Crystal Gems in Steven Universe?",
    "What is the Ice King's real name in Adventure Time?",
    "In Over the Garden Wall. Who tricked Wirt and Greg into going to Adelaide's House?",
    "Who is Muscle Man's best friend in Regular Show?"
];

const seriesAnswers = [
    ["Garnet, Amethyst, Pearl and Steven", "Pearl, Sapphire, Ruby and Rose Quartz", "Garnet, Ruby, Pearl and Amethyst"],
    ["Simon Petrikov", "James Conway", "Eric Conway"],
    ["Beatrice", "The Beast", "The Woodsman"],
    ["Hi Five Ghost", "Skips", "Rigby"]
];

const videoGamesCategory = createCategory(videoGamesQuestions, videoGamesAnswers);
const seriesCategory = createCategory(seriesQuestions, seriesAnswers);
const categories = [seriesCategory, videoGamesCategory, seriesCategory, videoGamesCategory];

const resultMessages = [
    "You didn't get any question 😭",
    "You only get one question 😥",
    "You get two questions, almost got it 😬",
    "You only miss one question 😀",
    "You answered all correctly 😎"
];