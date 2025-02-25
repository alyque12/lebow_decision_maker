<script>
    import { onMount } from 'svelte';
    import Results from './Results.svelte';
    import { 
        getAllSurveys, 
        getSurveyById, 
        getQuestionsForSurvey 
    } from './services/databaseService';

    let surveys = [];
    let selectedSurvey = null;
    let selectedSurveyId = null;
    let questions = [];
    let currentIndex = 0;
    let currentQuestion;
    let topicCounters = {};
    let showResults = false;
    let answerHistory = [];
    let isLoading = false;
    let error = null;

    onMount(async () => {
        // Check if there's a survey ID in the URL
        const urlParams = new URLSearchParams(window.location.search);
        const surveyId = urlParams.get('survey');
        
        if (surveyId) {
            try {
                await loadAndSelectSurvey(surveyId);
            } catch (err) {
                error = "Failed to load the requested survey.";
                await loadSurveys();
            }
        } else {
            // Load available surveys
            await loadSurveys();
        }
    });

    const loadSurveys = async () => {
        try {
            isLoading = true;
            surveys = await getAllSurveys();
            isLoading = false;
        } catch (err) {
            console.error("Error loading surveys:", err);
            error = "Failed to load surveys. Please try again later.";
            isLoading = false;
        }
    };

    const loadAndSelectSurvey = async (surveyId) => {
        try {
            isLoading = true;
            // Get survey details
            const survey = await getSurveyById(surveyId);
            
            // Get questions for this survey
            const surveyQuestions = await getQuestionsForSurvey(surveyId);
            
            if (!survey || !surveyQuestions || surveyQuestions.length === 0) {
                throw new Error("Survey not found or has no questions");
            }
            
            // Set up the survey
            selectedSurveyId = surveyId;
            selectedSurvey = survey;
            questions = surveyQuestions;
            currentIndex = 0;
            currentQuestion = questions[currentIndex];
            
            // Initialize counters
            topicCounters = (survey.topics || []).reduce((acc, topic) => {
                acc[topic] = 0;
                return acc;
            }, {});
            
            isLoading = false;
        } catch (err) {
            console.error("Error loading survey:", err);
            isLoading = false;
            throw err;
        }
    };

    const selectSurvey = async (survey) => {
        try {
            await loadAndSelectSurvey(survey.id);
            
            // Update URL without reloading the page
            const url = new URL(window.location);
            url.searchParams.set('survey', survey.id);
            window.history.pushState({}, '', url);
        } catch (err) {
            error = "Failed to load the selected survey.";
        }
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
        // Reset everything except error state
        selectedSurvey = null;
        selectedSurveyId = null;
        showResults = false;
        questions = [];
        currentIndex = 0;
        currentQuestion = null;
        answerHistory = [];
        topicCounters = {};
        
        // Clear survey ID from URL
        const url = new URL(window.location);
        url.searchParams.delete('survey');
        window.history.pushState({}, '', url);
    };
</script>

<main>
    {#if isLoading}
        <div class="loading">Loading...</div>
    {/if}
    
    {#if error}
        <div class="error">
            <p>{error}</p>
            <button on:click={() => error = null}>Dismiss</button>
        </div>
    {/if}
    
    {#if showResults}
        <Results 
            topicResults={topicCounters} 
            onRestart={handleRestart}
            answerHistory={answerHistory}
            surveyName={selectedSurvey?.name}
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
                            {survey.name}
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
                    <h3>Survey: {selectedSurvey.name}</h3>
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

    .loading {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 1.5rem;
        z-index: 1000;
    }

    .error {
        background-color: #f8d7da;
        color: #721c24;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .error button {
        background-color: #721c24;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
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
        
        .error {
            background-color: #f8d7da;
            color: #721c24;
        }
    }
</style>