<script>
    import { onMount } from 'svelte';

    let questions = [];
    let currentIndex = 0;
    let currentQuestion;
    let topic1Counter = 0;
    let topic2Counter = 0;

    // Load questions from localStorage
    onMount(() => {
        const storedQuestions = JSON.parse(localStorage.getItem('questions') || '[]');
        questions = storedQuestions;
        currentQuestion = questions[currentIndex]; // Initialize with the first question
    });

    const getTopics = () => {
        const storedTopics = JSON.parse(localStorage.getItem('topics'));
        return storedTopics ? storedTopics : ['', '']; // Default to empty strings if not found
    };

    // Move to the next question after the user clicks on either button
    const nextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            currentIndex++;
            currentQuestion = questions[currentIndex];
        } else {
            clearQuestions(); // Clear the questions if all are answered
            if (topic1Counter > topic2Counter) {
                alert(`You are more suited for ${getTopics()[0]}`);
            } else if (topic1Counter < topic2Counter) {
                alert(`You are more suited for ${getTopics()[1]}`);
            } else {
                alert(`You are suited for both ${getTopics()[0]} and ${getTopics()[1]}`);
            }
        }
    };

    // Handle the answer (this could be saving the answer to localStorage, or just moving to the next question)
    const handleAnswer = (answer) => {
        console.log(`${currentQuestion.question}: ${answer}`); // Placeholder for the answer handling
        if (answer === getTopics()[0]) {
            topic1Counter += 1;
        } else {
            topic2Counter += 1;
        }
        console.log(`${getTopics()[0]}: ${topic1Counter}`);
        console.log(`${getTopics()[1]}: ${topic2Counter}`);
        nextQuestion();
    };

    // Clear the questions from localStorage when all questions have been answered
    const clearQuestions = () => {
        localStorage.removeItem('questions'); // Remove the questions from localStorage
        questions = []; // Clear the questions array
        currentQuestion = null; // Clear the current question
    };
</script>

<main>
    {#if currentQuestion}
        <div class="question-container">
            <h2>{currentQuestion.question}</h2>
            <div class="button-container">
                <button on:click={() => handleAnswer(currentQuestion.leftButtonTopic)}>{currentQuestion.leftButtonText}</button>
                <button on:click={() => handleAnswer(currentQuestion.rightButtonTopic)}>{currentQuestion.rightButtonText}</button>
            </div>
        </div>
    {:else}
        <p>No questions available. Please add some questions first.</p>
    {/if}
</main>

<style>
    .question-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .button-container {
        display: flex;
        gap: 20px;
    }
    button {
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
    }
    button:hover {
        background-color: #0056b3;
    }
</style>
