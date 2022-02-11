<script>
	const passPhraseDefault = '[passPhrase not set]';
	export let passPhrase = passPhraseDefault;
</script>

{#if passPhrase === passPhraseDefault}

	<p>pass phrase not set</p>

{:else}

	<p>pass phrase {passPhrase} found!</p>

	<select id="selectComponent">
		<option value="ModCard">ModCard</option>
		<option value="SomethingElse">Something Else</option>
	</select>



{/if}