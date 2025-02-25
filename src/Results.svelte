<script>
    export let topicResults = {};
    export let onRestart;
    export let answerHistory = [];
    export let surveyName = "Survey";

    // Calculate percentages for each topic
    $: {
        const total = Object.values(topicResults).reduce((sum, count) => sum + count, 0);
        topicResults = Object.entries(topicResults).reduce((acc, [topic, count]) => {
            acc[topic] = {
                count,
                percentage: total > 0 ? Math.round((count / total) * 100) : 0,
                answers: answerHistory.filter(answer => answer.topics.includes(topic))
            };
            return acc;
        }, {});
    }

    // Function to share results
    const shareResults = () => {
        const maxScore = Math.max(...Object.values(topicResults).map(r => r.count));
        const topChoices = Object.entries(topicResults)
            .filter(([_, result]) => result.count === maxScore)
            .map(([topic]) => topic);
        
        let resultText = `I just completed the "${surveyName}" survey!\n\n`;
        
        if (topChoices.length === 1) {
            resultText += `My result: I am most suited for ${topChoices[0]}\n\n`;
        } else {
            resultText += `My result: I am equally suited for ${topChoices.join(' and ')}\n\n`;
        }
        
        resultText += `Take the survey yourself: ${window.location.href}`;
        
        // Use Web Share API if available
        if (navigator.share) {
            navigator.share({
                title: `My ${surveyName} Results`,
                text: resultText,
                url: window.location.href
            }).catch(err => {
                // Fallback to clipboard
                navigator.clipboard.writeText(resultText);
                alert('Results copied to clipboard!');
            });
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(resultText);
            alert('Results copied to clipboard!');
        }
    };
</script>

<div class="results-container">
    <h1>Your Results for "{surveyName}"</h1>
    
    <div class="results-grid">
        {#each Object.entries(topicResults) as [topic, result]}
            <div class="result-card" style="--percentage: {result.percentage}%">
                <h2>{topic}</h2>
                <div class="percentage-bar">
                    <div class="percentage-fill"></div>
                </div>
                <p class="percentage-text">{result.percentage}%</p>
                <p class="points-text">({result.count} points)</p>
                
                <div class="answers-section">
                    <h3>Supporting Answers:</h3>
                    {#if result.answers.length > 0}
                        <ul>
                            {#each result.answers as answer}
                                <li>
                                    <p class="question-text">{answer.question}</p>
                                    <p class="answer-text">You chose: {answer.answer}</p>
                                </li>
                            {/each}
                        </ul>
                    {:else}
                        <p class="no-answers">No answers for this topic</p>
                    {/if}
                </div>
            </div>
        {/each}
    </div>

    <div class="conclusion">
        {#if Object.entries(topicResults).length > 0}
            {@const maxScore = Math.max(...Object.values(topicResults).map(r => r.count))}
            {@const topChoices = Object.entries(topicResults)
                .filter(([_, result]) => result.count === maxScore)
                .map(([topic]) => topic)}
            
            <h2>Conclusion</h2>
            {#if topChoices.length === 1}
                <p>You are most suited for <strong>{topChoices[0]}</strong></p>
            {:else}
                <p>
                    You are equally suited for 
                    {#if topChoices.length === 2}
                        <strong>{topChoices[0]}</strong> and <strong>{topChoices[1]}</strong>
                    {:else}
                        {#each topChoices as choice, i}
                            <strong>{choice}</strong>{#if i < topChoices.length - 2}, {/if}{#if i === topChoices.length - 2} and {/if}
                        {/each}
                    {/if}
                </p>
            {/if}
        {/if}
    </div>

    <div class="action-buttons">
        <button class="restart-button" on:click={onRestart}>
            Start Over
        </button>
        <button class="share-button" on:click={shareResults}>
            Share Results
        </button>
    </div>
</div>

<style>
    .results-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
        gap: 2rem;
        min-height: 100vh;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
    }

    h1 {
        color: rgba(255, 255, 255, 0.87);
        font-size: 2.5rem;
        margin-bottom: 2rem;
        text-align: center;
    }

    .results-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        width: 100%;
    }

    .result-card {
        background: #1a1a1a;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .result-card h2 {
        color: rgba(255, 255, 255, 0.87);
        margin: 0;
        text-align: center;
    }

    .percentage-bar {
        width: 100%;
        height: 20px;
        background: #333;
        border-radius: 10px;
        overflow: hidden;
    }

    .percentage-fill {
        width: var(--percentage);
        height: 100%;
        background: #646cff;
        transition: width 1s ease-in-out;
    }

    .percentage-text {
        font-size: 1.5rem;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.87);
        margin: 0;
    }

    .points-text {
        color: rgba(255, 255, 255, 0.6);
        margin: 0;
    }

    .answers-section {
        width: 100%;
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .answers-section h3 {
        color: rgba(255, 255, 255, 0.87);
        font-size: 1.1rem;
        margin: 0 0 1rem 0;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        margin-bottom: 1rem;
        padding: 0.5rem;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.05);
    }

    .question-text {
        color: rgba(255, 255, 255, 0.87);
        margin: 0 0 0.5rem 0;
        font-weight: 500;
    }

    .answer-text {
        color: rgba(255, 255, 255, 0.6);
        margin: 0;
        font-size: 0.9rem;
    }

    .no-answers {
        color: rgba(255, 255, 255, 0.6);
        font-style: italic;
    }

    .conclusion {
        text-align: center;
        margin: 2rem 0;
        padding: 2rem;
        background: #1a1a1a;
        border-radius: 12px;
        width: 100%;
    }

    .conclusion h2 {
        color: rgba(255, 255, 255, 0.87);
        margin-bottom: 1rem;
    }

    .conclusion p {
        font-size: 1.25rem;
        color: rgba(255, 255, 255, 0.87);
    }

    .conclusion strong {
        color: #646cff;
    }

    .action-buttons {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
    }

    .restart-button {
        padding: 1rem 2rem;
        font-size: 1.2rem;
        background-color: #646cff;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .restart-button:hover {
        background-color: #535bf2;
    }

    .share-button {
        padding: 1rem 2rem;
        font-size: 1.2rem;
        background-color: #2ea44f;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .share-button:hover {
        background-color: #2c974b;
    }

    @media (prefers-color-scheme: light) {
        .result-card {
            background: white;
        }

        .result-card h2 {
            color: #213547;
        }

        .percentage-text {
            color: #213547;
        }

        .points-text {
            color: #666;
        }

        .answers-section h3 {
            color: #213547;
        }

        li {
            background: rgba(0, 0, 0, 0.05);
        }

        .question-text {
            color: #213547;
        }

        .answer-text {
            color: #666;
        }

        .no-answers {
            color: #666;
        }

        .conclusion {
            background: white;
        }

        .conclusion h2, .conclusion p {
            color: #213547;
        }

        h1 {
            color: #213547;
        }
    }
</style>