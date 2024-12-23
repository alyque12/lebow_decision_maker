<script>
    export let question = "Default question?";
    export let leftButtonText = "Left Button";
    export let rightButtonText = "Right Button";
</script>

<style>
    .card {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 16px;
        max-width: 300px;
        text-align: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .question {
        font-size: 1.2rem;
        margin-bottom: 16px;
    }

    .button-container {
        display: flex;
        justify-content: space-between;
    }

    .button {
        padding: 8px 12px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        background-color: #007bff;
        color: #fff;
        flex: 1;
        margin: 0 4px;
    }

    .button:hover {
        background-color: #0056b3;
    }
</style>

<div class="card">
    <div class="question">{question}</div>
    <div class="button-container">
        <button class="button">{leftButtonText}</button>
        <button class="button">{rightButtonText}</button>
    </div>
</div>
