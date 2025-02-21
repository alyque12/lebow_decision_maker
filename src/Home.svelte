<script>
    import { onMount } from 'svelte';
    import Results from './Results.svelte';

    let surveys = [];
    let selectedSurvey = null;
    let questions = [];
    let currentIndex = 0;
    let currentQuestion;
    let topicCounters = {};
    let showResults = false;
    let answerHistory = [];

    onMount(() => {
        // Load available surveys
        surveys = JSON.parse(localStorage.getItem('surveys') || '[]');
    });

    const selectSurvey = (surveyName) => {
        selectedSurvey = surveyName;
        const storedQuestions = JSON.parse(localStorage.getItem(`questions_${surveyName}`) || '[]');
        questions = storedQuestions;
        currentQuestion = questions[currentIndex];
        
        // Initialize counters for each topic
        const topics = JSON.parse(localStorage.getItem(`topics_${surveyName}`)) || [];
        topicCounters = topics.reduce((acc, topic) => {
            acc[topic] = 0;
            return acc;
        }, {});
    };

    const handleAnswer = (selectedTopics, buttonText) => {
        answerHistory.push({
            question: currentQuestion.question,
            answer: buttonText,
            topics: selectedTopics
        });
        
        selectedTopics.forEach(topic => {
            topicCounters[topic]++;
        });
        
        console.log('Current topic counts:', topicCounters);
        nextQuestion();
    };

    const nextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            currentIndex++;
            currentQuestion = questions[currentIndex];
        } else {
            showResults = true;
        }
    };

    const handleRestart = () => {
        selectedSurvey = null;
        showResults = false;
        questions = [];
        currentIndex = 0;
        currentQuestion = null;
        answerHistory = [];
        topicCounters = {};
    };
</script>

<main>
    {#if showResults}
        <Results 
            topicResults={topicCounters} 
            onRestart={handleRestart}
            answerHistory={answerHistory}
            surveyName={selectedSurvey}
        />
    {:else if !selectedSurvey}
        <div class="survey-selection">
            <h2>Select a Survey</h2>
            {#if surveys.length > 0}
                <div class="survey-list">
                    {#each surveys as survey}
                        <button 
                            class="survey-button"
                            on:click={() => selectSurvey(survey)}
                        >
                            {survey}
                        </button>
                    {/each}
                </div>
            {:else}
                <p>No surveys available. Please add some surveys first.</p>
            {/if}
        </div>
    {:else}
        <div class="main-content">
            {#if currentQuestion}
                <div class="question-container">
                    <h3>Survey: {selectedSurvey}</h3>
                    <h2>{currentQuestion.question}</h2>
                    <div class="button-container">
                        {#each currentQuestion.buttons as button}
                            <button on:click={() => handleAnswer(button.selectedTopics, button.text)}>
                                {button.text}
                            </button>
                        {/each}
                    </div>
                    <div class="progress">
                        Question {currentIndex + 1} of {questions.length}
                    </div>
                </div>
            {:else}
                <div class="no-questions">
                    <p>No questions available for this survey.</p>
                    <button on:click={handleRestart}>Select Another Survey</button>
                </div>
            {/if}
        </div>
    {/if}
</main>

<style>
    main {
        width: 100%;
    }

    .survey-selection {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
    }

    .survey-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 400px;
        margin: 2rem auto;
    }

    .survey-button {
        padding: 1rem 2rem;
        font-size: 1.1rem;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .survey-button:hover {
        background-color: #0056b3;
    }

    .main-content {
        max-width: 800px;
        margin: 0 auto;
        padding: 1rem;
    }

    .question-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
    }

    h2 {
        font-size: 1.5rem;
        color: rgba(255, 255, 255, 0.87);
        text-align: center;
        margin: 0;
    }

    h3 {
        font-size: 1.2rem;
        color: rgba(255, 255, 255, 0.6);
        margin: 0;
    }

    .button-container {
        display: flex;
        gap: 20px;
        justify-content: center;
        flex-wrap: wrap;
    }

    button {
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 8px;
        font-size: 1em;
        font-weight: 500;
        transition: background-color 0.25s;
    }

    button:hover {
        background-color: #0056b3;
    }

    .progress {
        color: rgba(255, 255, 255, 0.6);
        font-size: 0.9rem;
        margin-top: 1rem;
    }

    .no-questions {
        text-align: center;
        padding: 1rem;
        color: rgba(255, 255, 255, 0.87);
    }

    @media (prefers-color-scheme: light) {
        h2 {
            color: #213547;
        }
        
        h3 {
            color: #666;
        }

        .progress {
            color: #666;
        }

        .no-questions {
            color: #213547;
        }
    }
</style>