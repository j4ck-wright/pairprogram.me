<script lang="ts">
	let timer = 10;
	$: if (timer < 1) {
		timer = 1;
	} else if (timer > 100) {
		timer = 100;
	}
</script>

<div class="container mt-2">
	<span class="mr-12">Timer:</span>
	<div class="join">
		<button
			class="btn btn-xs no-animation btn-primary text-white join-item rounded-l-full"
			on:click={() => {
				timer--;
			}}>-</button
		>
		<input
			data-testid="timerBox"
			type="number"
			bind:value={timer}
			class=" w-12 bg-transparent join-item text-center outline-primary"
		/>
		<button
			class="btn btn-xs no-animation btn-primary text-white join-item rounded-r-full"
			on:click={() => {
				timer++;
			}}>+</button
		>
	</div>
	<span class="ml-2">Minutes</span>
</div>

<style>
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
