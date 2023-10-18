<script lang="ts">
	import {
		watchTimerIntervalMinutes,
		setTimerIntervalMinutes,
		timerIntervalMinutesStore
	} from '$lib/firebase';

	const MAX_TIMER = 100;

	function handleLocalTimerChange(newTime: number) {
		if (newTime > 0 && newTime <= MAX_TIMER) {
			setTimerIntervalMinutes(newTime);
		} else {
			const timerBox = document.getElementById('timerBox') as HTMLInputElement;
			if (timerBox) {
				timerBox.value = $timerIntervalMinutesStore.toString();
			}
		}
	}

	function newLocalTimer(e: FocusEvent) {
		const target = e.target as HTMLInputElement;
		const val = parseInt(target.value, 10);
		handleLocalTimerChange(val);
	}

	watchTimerIntervalMinutes();
</script>

<div class="container mt-2">
	<span class="mr-12">Timer:</span>
	<div class="join">
		<button
			class="btn btn-xs no-animation btn-primary text-white join-item rounded-l-full"
			on:click={() => {
				handleLocalTimerChange($timerIntervalMinutesStore - 1);
			}}>-</button
		>
		<input
			id="timerBox"
			data-testid="timerBox"
			type="number"
			value={$timerIntervalMinutesStore}
			class=" w-12 bg-transparent join-item text-center outline-primary"
			on:focusout={newLocalTimer}
		/>
		<button
			class="btn btn-xs no-animation btn-primary text-white join-item rounded-r-full"
			on:click={() => {
				handleLocalTimerChange($timerIntervalMinutesStore + 1);
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
