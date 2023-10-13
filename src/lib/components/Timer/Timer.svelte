<script>
	import { tweened } from 'svelte/motion';

	let percentage = 80;
	let elapsed = 0;
	let startTime = 10 * 60;
	let timer = tweened(startTime);
	let timerIsRunning = false;

	setInterval(() => {
		if ($timer > 0 && timerIsRunning) {
			$timer--;
			elapsed++;
		}
	}, 1000);

	$: percentage = 100 - (elapsed / startTime) * 100;
	$: minutes = Math.floor($timer / 60);
	$: seconds = Math.floor($timer - minutes * 60);
	$: displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
	$: displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
</script>

<div class="container">
	<div class="timer-container flex justify-end">
		<div
			class="radial-progress text-primary font-bold text-4xl"
			style="--value:{percentage}; --size:21rem; --thickness: 0.5rem;"
		>
			{displayMinutes}:{displaySeconds}
		</div>
	</div>

	<div class="join mt-6 flex justify-end">
		<button class="btn btn-primary join-item">Pause</button>
		<button class="btn join-item">Skip</button>
		<button class="btn join-item">Restart</button>
		<button class="btn join-item">Shuffle</button>
	</div>
</div>
