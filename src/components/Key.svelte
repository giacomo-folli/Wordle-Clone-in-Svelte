<script>
    export let char;
    export let keyPress;
    const keyClass = (char == 'ENTER' || char == 'DEL')? 'key special' : 'key';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class={keyClass} on:click={() => keyPress(char.toUpperCase())}>
    {char.toUpperCase()}
</div>

<style>
    .key {
        background-color: var(--onyx);
        color: var(--whish);
        padding: 10px 9px;
        margin: 2px 1px;
        cursor: pointer;
        border-radius: 3px;
        transition: background-color .3s;
    }

    .key:hover {
        background-color: var(--orange);
    }

    .special {
        padding: 10px 17px;
    }
</style>