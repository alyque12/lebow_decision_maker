<script>
    import { writable } from 'svelte/store';

    // State variables for topics
    let topic1 = '';
    let topic2 = '';
    let question = '';
    let leftButtonText = '';
    let rightButtonText = '';
    let leftButtonTopic1 = false;
    let leftButtonTopic2 = false;
    let rightButtonTopic1 = false;
    let rightButtonTopic2 = false;
    let questions = [];

    // State to track whether topics are added
    let areTopicsAdded = writable(false);

    // Add the topics to localStorage
    const addTopics = () => {
        if (topic1 && topic2) {
            // Store topics in localStorage
            localStorage.setItem('topics', JSON.stringify([topic1, topic2]));
            areTopicsAdded.set(true); // Update state to show the question form
        } else {
            alert('Please enter both topics');
        }
    };

    // Get the stored topics from localStorage
    const getTopics = () => {
        const storedTopics = JSON.parse(localStorage.getItem('topics'));
        return storedTopics ? storedTopics : ['', '']; // Default to empty strings if not found
    };

    // Add question to localStorage and clear the form inputs
    const addQuestion = () => {
        if (question && leftButtonText && rightButtonText) {
            let currentQuestions = JSON.parse(localStorage.getItem('questions') || '[]');
            currentQuestions.push({
                question,
                leftButtonText,
                rightButtonText,
                leftButtonTopic: leftButtonTopic1 ? topic1 : topic2,
                rightButtonTopic: rightButtonTopic1 ? topic1 : topic2,
            });
            localStorage.setItem('questions', JSON.stringify(currentQuestions));

            // Clear the form inputs after adding the question
            question = '';
            leftButtonText = '';
            rightButtonText = '';
            leftButtonTopic1 = false;
            leftButtonTopic2 = false;
            rightButtonTopic1 = false;
            rightButtonTopic2 = false;
        } else {
            alert('Please fill in all fields for the question');
        }
    };
</script>

<main>
    {#if !$areTopicsAdded}
        <!-- Show topic form before question form -->
        <div class="topics-form">
            <h2>Enter Two Topics (Categories)</h2>
            <input type="text" bind:value={topic1} placeholder="Enter first topic" />
            <input type="text" bind:value={topic2} placeholder="Enter second topic" />
            <button on:click={addTopics}>Submit Topics</button>
        </div>
    {:else}
        <!-- After topics are added, show question form -->
        <div class="add-question-container">
            <h2>Add a New Question</h2>
            <input type="text" bind:value={question} placeholder="Enter your question" />

            <div class="button-container">
                <div>
                    <input type="text" bind:value={leftButtonText} placeholder="Left button text" />
                    <label>
                        <input type="checkbox" bind:checked={leftButtonTopic1} />
                        {getTopics()[0]}
                    </label>
                    <label>
                        <input type="checkbox" bind:checked={leftButtonTopic2} />
                        {getTopics()[1]}
                    </label>
                </div>

                <div>
                    <input type="text" bind:value={rightButtonText} placeholder="Right button text" />
                    <label>
                        <input type="checkbox" bind:checked={rightButtonTopic1} />
                        {getTopics()[0]}
                    </label>
                    <label>
                        <input type="checkbox" bind:checked={rightButtonTopic2} />
                        {getTopics()[1]}
                    </label>
                </div>
            </div>

            <button on:click={addQuestion}>Add Question</button>
        </div>
    {/if}
</main>

<style>
    .topics-form, .add-question-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    input {
        margin: 10px;
        padding: 8px;
        font-size: 1rem;
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

    .button-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    label {
        margin-left: 10px;
        font-size: 0.9rem;
    }

    .button-container div {
        margin-bottom: 10px;
    }
</style>
