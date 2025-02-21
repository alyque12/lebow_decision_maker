<script>
    import { writable } from 'svelte/store';

    // State variables
    let surveyName = '';
    let numTopics = 2;
    let topics = [];
    let question = '';
    let numOptions = 2;
    let buttons = [];
    let existingSurveys = [];
    let selectedSurvey = null;
    let editMode = false;
    let existingQuestions = [];
    let showAddQuestionForm = false;
    
    let areTopicsAdded = writable(false);
    let isSurveyNameAdded = writable(false);
    let showSurveySelection = true;

    // Load existing surveys on mount
    const loadSurveys = () => {
        existingSurveys = JSON.parse(localStorage.getItem('surveys') || '[]');
    };
    loadSurveys();

    const createNewSurvey = () => {
        showSurveySelection = false;
        editMode = false;
        isSurveyNameAdded.set(false);
        areTopicsAdded.set(false);
        surveyName = '';
        selectedSurvey = null;
        numTopics = 2; // Reset to default
        initializeTopics(); // Initialize topics array immediately
    };

    const editExistingSurvey = (survey) => {
        selectedSurvey = survey;
        surveyName = survey;
        editMode = true;
        showSurveySelection = false;
        isSurveyNameAdded.set(true);
        areTopicsAdded.set(true);
        topics = JSON.parse(localStorage.getItem(`topics_${survey}`)) || [];
        existingQuestions = JSON.parse(localStorage.getItem(`questions_${survey}`)) || [];
        initializeButtons();
        showAddQuestionForm = false;
    };

    const toggleAddQuestionForm = () => {
        showAddQuestionForm = !showAddQuestionForm;
        if (showAddQuestionForm) {
            question = '';
            initializeButtons();
        }
    };

    const deleteSurvey = (survey) => {
        if (confirm(`Are you sure you want to delete the survey "${survey}"?`)) {
            const surveys = JSON.parse(localStorage.getItem('surveys') || '[]');
            const updatedSurveys = surveys.filter(s => s !== survey);
            localStorage.setItem('surveys', JSON.stringify(updatedSurveys));
            localStorage.removeItem(`topics_${survey}`);
            localStorage.removeItem(`questions_${survey}`);
            existingSurveys = updatedSurveys;
        }
    };

    const deleteQuestion = (index) => {
        if (confirm('Are you sure you want to delete this question?')) {
            // Create a new array without the deleted question
            existingQuestions = existingQuestions.filter((_, i) => i !== index);
            localStorage.setItem(`questions_${selectedSurvey}`, JSON.stringify(existingQuestions));
        }
    };

    const initializeTopics = () => {
        numTopics = Math.max(2, Math.min(10, numTopics));
        topics = new Array(numTopics).fill('');
    };

    const initializeButtons = () => {
        buttons = Array(numOptions).fill().map(() => ({
            text: '',
            selectedTopics: new Array(topics.length).fill(false)
        }));
    };

    const addSurveyName = () => {
        if (!surveyName.trim()) {
            alert('Please enter a survey name');
            return;
        }

        let surveys = JSON.parse(localStorage.getItem('surveys') || '[]');
        
        if (surveys.includes(surveyName)) {
            alert('A survey with this name already exists');
            return;
        }

        surveys.push(surveyName);
        localStorage.setItem('surveys', JSON.stringify(surveys));
        existingSurveys = surveys;
        
        isSurveyNameAdded.set(true);
    };

    const addTopics = () => {
        if (topics.length > 10) {
            alert('Maximum number of topics is 10');
            initializeTopics();
            return;
        }
        if (topics.every(topic => topic.trim() !== '')) {
            localStorage.setItem(`topics_${surveyName}`, JSON.stringify(topics));
            areTopicsAdded.set(true);
            initializeButtons();
        } else {
            alert('Please enter all topics');
        }
    };

    const getTopics = () => {
        const storedTopics = JSON.parse(localStorage.getItem(`topics_${surveyName}`));
        return storedTopics || [];
    };

    const addQuestion = () => {
        if (question && buttons.every(btn => btn.text && btn.selectedTopics.some(t => t))) {
            let currentQuestions = existingQuestions;
            
            currentQuestions.push({
                question,
                buttons: buttons.map(btn => ({
                    text: btn.text,
                    selectedTopics: topics.filter((_, index) => btn.selectedTopics[index])
                }))
            });
            
            localStorage.setItem(`questions_${surveyName}`, JSON.stringify(currentQuestions));
            existingQuestions = currentQuestions;

            question = '';
            initializeButtons();
            showAddQuestionForm = false;
        } else {
            alert('Please fill in all fields and select at least one topic per button');
        }
    };

    const handleNumTopicsChange = () => {
        numTopics = Math.max(2, Math.min(10, numTopics));
        initializeTopics();
    };

    const handleNumOptionsChange = () => {
        if (numOptions < 2) numOptions = 2;
        if (numOptions > 10) numOptions = 10;
        initializeButtons();
    };

    const goBackToSurveyList = () => {
        showSurveySelection = true;
        editMode = false;
        isSurveyNameAdded.set(false);
        areTopicsAdded.set(false);
        selectedSurvey = null;
        showAddQuestionForm = false;
        loadSurveys();
    };
</script>

<main>
    {#if showSurveySelection}
        <div class="survey-management">
            <h2>Survey Management</h2>
            <button class="create-new" on:click={createNewSurvey}>Create New Survey</button>
            
            {#if existingSurveys.length > 0}
                <div class="existing-surveys">
                    <h3>Existing Surveys</h3>
                    {#each existingSurveys as survey}
                        <div class="survey-item">
                            <span class="survey-name">{survey}</span>
                            <div class="survey-actions">
                                <button on:click={() => editExistingSurvey(survey)}>Edit</button>
                                <button class="delete" on:click={() => deleteSurvey(survey)}>Delete</button>
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    {:else if !$isSurveyNameAdded}
        <div class="survey-name-form">
            <button class="back-button" on:click={goBackToSurveyList}>← Back to Survey List</button>
            
            <div class="survey-section">
                <h2>Enter Survey Name</h2>
                <input 
                    type="text" 
                    bind:value={surveyName} 
                    placeholder="Enter survey name"
                />
                <button on:click={addSurveyName}>Submit Survey Name</button>
            </div>

            <div class="topics-section">
                <h2>How many topics would you like to add? (2-10)</h2>
                <input 
                    type="number" 
                    bind:value={numTopics} 
                    min="2" 
                    max="10"
                    on:input={handleNumTopicsChange}
                />
                
                <h3>Enter Your Topics</h3>
                {#each topics as topic, i}
                    <input 
                        type="text" 
                        bind:value={topics[i]} 
                        placeholder={`Enter topic ${i + 1}`} 
                    />
                {/each}
            </div>
        </div>
    {:else if !$areTopicsAdded && !editMode}
        <div class="topics-form">
            <button class="back-button" on:click={goBackToSurveyList}>← Back to Survey List</button>
            <h2>Confirm Your Topics</h2>
            {#each topics as topic, i}
                <input 
                    type="text" 
                    bind:value={topics[i]} 
                    placeholder={`Enter topic ${i + 1}`} 
                />
            {/each}
            <button on:click={addTopics}>Submit Topics</button>
        </div>
    {:else}
        <div class="question-management">
            <button class="back-button" on:click={goBackToSurveyList}>← Back to Survey List</button>
            <h2>Survey: {surveyName}</h2>

            {#if !showAddQuestionForm}
                <div class="existing-questions">
                    <button class="create-new" on:click={toggleAddQuestionForm}>Add New Question</button>
                    
                    {#if existingQuestions.length > 0}
                        <h3>Questions</h3>
                        {#each existingQuestions as q, index}
                            <div class="question-item">
                                <span class="question-text">{q.question}</span>
                                <div class="question-actions">
                                    <button class="delete" on:click={() => deleteQuestion(index)}>Delete</button>
                                </div>
                            </div>
                        {/each}
                    {:else}
                        <p class="no-questions">No questions added yet.</p>
                    {/if}
                </div>
            {:else}
                <div class="add-question-container">
                    <button class="back-button" on:click={toggleAddQuestionForm}>← Back to Questions</button>
                    <h2>Add a New Question to "{surveyName}"</h2>
                    <input type="text" bind:value={question} placeholder="Enter your question" />

                    <div class="options-count">
                        <h3>Number of options for this question:</h3>
                        <input 
                            type="number" 
                            bind:value={numOptions} 
                            min="2" 
                            max="10"
                            on:input={handleNumOptionsChange}
                        />
                    </div>

                    <div class="button-container">
                        {#each buttons as button, buttonIndex}
                            <div class="button-options">
                                <h4>Option {buttonIndex + 1}</h4>
                                <input 
                                    type="text" 
                                    bind:value={button.text} 
                                    placeholder={`Option ${buttonIndex + 1} text`} 
                                />
                                <div class="topic-checkboxes">
                                    <p>Select associated topics:</p>
                                    {#each topics as topic, topicIndex}
                                        <label>
                                            <input 
                                                type="checkbox" 
                                                bind:checked={button.selectedTopics[topicIndex]} 
                                            />
                                            {topic}
                                        </label>
                                    {/each}
                                </div>
                            </div>
                        {/each}
                    </div>

                    <button on:click={addQuestion}>Add Question</button>
                </div>
            {/if}
        </div>
    {/if}
</main>

<style>
    main {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        padding: 1rem;
    }

    .back-button {
        align-self: flex-start;
        margin-bottom: 1rem;
    }

    .survey-management,
    .question-management {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .create-new {
        background-color: #28a745;
        color: white;
        padding: 1rem 2rem;
        font-size: 1.1rem;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        margin: 1rem 0;
    }

    .create-new:hover {
        background-color: #218838;
    }

    .existing-surveys,
    .existing-questions {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .survey-item,
    .question-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: #1a1a1a;
        border-radius: 8px;
    }

    .survey-actions,
    .question-actions {
        display: flex;
        gap: 0.5rem;
    }

    .survey-name,
    .question-text {
        font-size: 1.1rem;
        color: rgba(255, 255, 255, 0.87);
    }

    .delete {
        background-color: #dc3545;
    }

    .delete:hover {
        background-color: #c82333;
    }

    button {
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 8px;
    }

    button:hover {
        background-color: #0056b3;
    }

    h2, h3, h4 {
        color: rgba(255, 255, 255, 0.87);
        margin: 0;
    }

    .add-question-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    input {
        margin: 10px;
        padding: 8px;
        font-size: 1rem;
    }

    input[type="number"] {
        width: 80px;
        text-align: center;
    }

    .options-count {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 1rem 0;
    }

    .button-container {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        width: 100%;
        max-width: 500px;
    }

    .button-options {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 8px;
    }

    .topic-checkboxes {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
        margin-top: 0.5rem;
    }

    .topic-checkboxes p {
        margin: 0.5rem 0;
        font-weight: bold;
    }

    label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .no-questions {
        color: rgba(255, 255, 255, 0.6);
        text-align: center;
        padding: 1rem;
    }

    @media (prefers-color-scheme: light) {
        .survey-item,
        .question-item,
        .button-options {
            background-color: #f8f9fa;
        }

        input {
            background-color: white;
            border-color: #ddd;
            color: #213547;
        }

        .survey-name,
        .question-text,
        h2, h3, h4,
        label {
            color: #213547;
        }

        .no-questions {
            color: #666;
        }
    }
</style>