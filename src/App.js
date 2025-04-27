import React, { useState } from 'react';

// Question bank
const topics = {
  "AP Biology": [
    { id: 1, question: "Which organelle is responsible for energy production in the cell?", choices: ["Nucleus", "Mitochondria", "Ribosome", "Golgi Apparatus"], correct: "Mitochondria" },
    { id: 2, question: "Which part of a plant cell contains chlorophyll?", choices: ["Chloroplast", "Nucleus", "Mitochondria", "Vacuole"], correct: "Chloroplast" },
    { id: 3, question: "What is the term for a segment of DNA that codes for a specific protein?", choices: ["Chromosome", "Gene", "Allele", "Codon"], correct: "Gene" },
    { id: 4, question: "In Mendelian genetics, what is the expected phenotypic ratio of a heterozygous monohybrid cross?", choices: ["3:1", "1:1", "2:1", "4:0"], correct: "3:1" },
    { id: 5, question: "Which scientist formulated the theory of natural selection?", choices: ["Gregor Mendel", "Charles Darwin", "Rosalind Franklin", "Alfred Wegener"], correct: "Charles Darwin" },
    { id: 6, question: "What term describes the process where organisms better adapted to their environment tend to survive and reproduce?", choices: ["Genetic drift", "Natural selection", "Gene flow", "Artificial selection"], correct: "Natural selection" },
    { id: 7, question: "Which of the following is an example of a density-dependent limiting factor?", choices: ["Hurricanes", "Wildfires", "Disease", "Volcanic eruption"], correct: "Disease" },
    { id: 8, question: "In a food web, which trophic level has the greatest energy available?", choices: ["Primary consumers", "Secondary consumers", "Producers", "Apex predators"], correct: "Producers" },
    { id: 9, question: "Which macromolecule serves as the primary energy source for cells?", choices: ["Proteins", "Lipids", "Carbohydrates", "Nucleic acids"], correct: "Carbohydrates" },
    { id: 10, question: "What type of bond holds together the two strands of DNA?", choices: ["Covalent bonds", "Hydrogen bonds", "Ionic bonds", "Peptide bonds"], correct: "Hydrogen bonds" }
  ],
  "United States History": [
    {id:11,question:"What was the main purpose of the Marshall Plan?",choices:["To rebuild European economies after World War II","To provide military support to NATO allies","To establish the United Nations","To enforce the Monroe Doctrine"],correct:"To rebuild European economies after World War II"},
    {id:12,question:"Which U.S. President resigned due to the Watergate scandal?",choices:["Richard Nixon","Gerald Ford","Jimmy Carter","Lyndon B. Johnson"],correct:"Richard Nixon"},
    {id:13,question:"What was the significance of the Louisiana Purchase?",choices:["It doubled the size of the United States","It ended the Revolutionary War","It was the first U.S. territory acquired from Spain","It led to the Civil War"],correct:"It doubled the size of the United States"},
    {id:14,question:"Which battle marked the turning point of the American Civil War?",choices:["Battle of Antietam","Battle of Gettysburg","Battle of Fort Sumter","Battle of Bull Run"],correct:"Battle of Gettysburg"},
    {id:15,question:"What was the main cause of the Spanish-American War?",choices:["The sinking of the USS Maine","Expansion of U.S. territories","Disputes over the Panama Canal","The Monroe Doctrine"],correct:"The sinking of the USS Maine"},
    {id:16,question:"Which amendment granted women the right to vote?",choices:["15th Amendment","19th Amendment","22nd Amendment","26th Amendment"],correct:"19th Amendment"},
    {id:17,question:"Who was the primary author of the U.S. Constitution?",choices:["James Madison","Alexander Hamilton","Benjamin Franklin","Thomas Jefferson"],correct:"James Madison"},
    {id:18,question:"Which event triggered the Great Depression?",choices:["The Stock Market Crash of 1929","World War I","The Dust Bowl","The New Deal"],correct:"The Stock Market Crash of 1929"},
    {id:19,question:"Which landmark Supreme Court case ended segregation in public schools?",choices:["Plessy v. Ferguson","Brown v. Board of Education","Roe v. Wade","Marbury v. Madison"],correct:"Brown v. Board of Education"},
    {id:20,question:"Which document begins with 'We the People'?",choices:["The Declaration of Independence","The Constitution","The Gettysburg Address","The Emancipation Proclamation"],correct:"The Constitution"}
  ]
};

// Function to get 10 random questions
function getRandomQuestions() {
  return topics["AP Biology"].sort(() => Math.random() - 0.5).slice(0, 10);
}

function App() {
  const [step, setStep] = useState('welcome');
  const [questions, setQuestions] = useState(getRandomQuestions());
  const [current, setCurrent] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswer = () => {
    const currentQ = questions[current];
    const isCorrect = selectedAnswer === currentQ.correct;

    setUserAnswers([...userAnswers, { ...currentQ, userInput: selectedAnswer, isCorrect }]);
    setSelectedAnswer(null);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setStep('results');
    }
  };

  const handleRestartQuiz = () => {
    setQuestions(getRandomQuestions()); // Generate a new set
    setUserAnswers([]);
    setCurrent(0);
    setStep('quiz');
  };

  if (step === 'welcome') {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">AP Biology Quiz</h1>
      <div className="mt-6 space-y-4">
        {Object.keys(topics).map(topic => (
          <button 
            key={topic} 
            onClick={() => { setSelectedTopic(topic); setStep('quiz'); }} 
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}

  if (step === 'quiz') {
    const q = questions[current];
    return (
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Question {current + 1} of 10</h2>
        <p className="text-lg text-gray-800">{q.question}</p>
        <div className="mt-4 space-y-3">
          {q.choices.map((choice, index) => (
            <label key={index} className="block cursor-pointer bg-gray-200 p-3 rounded-lg hover:bg-gray-300">
              <input
                type="radio"
                name="answer"
                value={choice}
                checked={selectedAnswer === choice}
                onChange={() => setSelectedAnswer(choice)}
                className="mr-2"
              />
              {choice}
            </label>
          ))}
        </div>
        <button
          onClick={handleAnswer}
          disabled={!selectedAnswer}
          className="mt-6 px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
        >
          Submit
        </button>
      </div>
    );
  }

  if (step === 'results') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-800">Results</h2>
        <ul className="mt-6 space-y-3">
          {userAnswers.map((ans, idx) => (
            <li key={idx} className={`p-3 rounded-lg ${ans.isCorrect ? "bg-green-200" : "bg-red-200"}`}>
              {ans.question} — Your answer: {ans.userInput} —
              {ans.isCorrect ? " ✅ Correct" : ` ❌ Incorrect (Correct: ${ans.correct})`}
            </li>
          ))}
        </ul>
        <button
          onClick={handleRestartQuiz}
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
        >
          New Quiz
        </button>
      </div>
    );
  }

  return null;
}

export default App;