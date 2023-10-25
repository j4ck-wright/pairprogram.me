<<<<<<< HEAD
<script lang="ts">
	import {
		watchTimerStatus,
		timerPausedStore,
		timerIntervalMinutesStore,
		timerPausedEpochStore,
		watchRoundInProgress,
		watchPausedTimestamp,
		watchStartEpoch,
		setStartEpoch,
		timerStartEpochStore,
		setPausedTimestamp,
		setTimerStatus,
		roundInProgressStore,
		setRoundInProgress
	} from '$lib/firebase';
	import { onDestroy, onMount } from 'svelte';

	let timerInterval: NodeJS.Timeout;
	let time: string;
	let timePercentage: number;

	function getRemainingTimeNewlyJoined() {
		if (!$roundInProgressStore)
			return `${$timerIntervalMinutesStore < 10 ? '0' : ''}${$timerIntervalMinutesStore}:00`;
		if ($timerPausedStore) {
			const timeRemainingBeforePause =
				$timerIntervalMinutesStore * 60 - ($timerPausedEpochStore - $timerStartEpochStore);
			return formatRemainingTime(timeRemainingBeforePause);
		} else {
			return getRemainingTime();
		}
	}

	function getRemainingTime() {
		if ($roundInProgressStore && $timerPausedStore === false) {
			const currentTime = Math.floor(Date.now() / 1000);
			const elapsedTime = currentTime - $timerStartEpochStore;
			const remainingTime = Math.max(0, $timerIntervalMinutesStore * 60 - elapsedTime);
			return formatRemainingTime(remainingTime);
		} else if ($roundInProgressStore === false) {
			return `${$timerIntervalMinutesStore < 10 ? '0' : ''}${$timerIntervalMinutesStore}:00`;
=======
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
>>>>>>> main
		}
	}

<<<<<<< HEAD
	function getTimePercentage() {
		const secondsRemaining = formattedTimeToSeconds(time);
		timePercentage = (secondsRemaining / ($timerIntervalMinutesStore * 60)) * 100;
	}

	function formatRemainingTime(remainingTime: number) {
		if (remainingTime <= 0) return '00:00';
		const minutes = Math.floor(remainingTime / 60);
		const seconds = Math.floor(remainingTime % 60);

		return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	}

	function formattedTimeToSeconds(formattedTime: string) {
		const split = formattedTime.split(':');
		const minutes = parseInt(split[0]);
		const seconds = parseInt(split[1]);
		return minutes * 60 + seconds;
	}

	onMount(() => {
		time = getRemainingTimeNewlyJoined() as string;
		getTimePercentage();
		timerInterval = setInterval(() => {
			if ($roundInProgressStore) {
				const newTime = getRemainingTime();
				if (newTime) {
					time = newTime;
					getTimePercentage();
					if (time === '00:00') {
						setRoundInProgress(false);
						setTimerStatus(true);
						timePercentage = 100;
					}
				}
			}
		}, 500);
	});

	onDestroy(() => {
		clearInterval(timerInterval);
	});

	watchStartEpoch();
	watchTimerStatus();
	watchPausedTimestamp();
	watchRoundInProgress();
=======
	$: percentage = 100 - (elapsed / startTime) * 100;
	$: minutes = Math.floor($timer / 60);
	$: seconds = Math.floor($timer - minutes * 60);
	$: displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
	$: displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
>>>>>>> main
</script>

<div class="container">
	<div class="timer-container flex justify-end">
		<div
			class="radial-progress text-primary font-bold text-4xl"
			style="--value:{timePercentage}; --size:21rem; --thickness: 0.5rem;"
		>
			{time}
		</div>
	</div>

	<div class="join mt-6 flex justify-end">
<<<<<<< HEAD
		<button
			class="btn btn-primary join-item"
			on:click={() => {
				setTimerStatus(!$timerPausedStore);

				if ($roundInProgressStore === true) {
					if ($timerPausedStore === false) {
						const currentEpoch = Date.now() / 1000;
						const pausedDuration = currentEpoch - $timerPausedEpochStore;
						const updatedStartEpoch = $timerStartEpochStore + pausedDuration;
						setPausedTimestamp(0);
						setStartEpoch(updatedStartEpoch);
						setTimerStatus(false);
					} else {
						setPausedTimestamp(Date.now() / 1000);
						setTimerStatus(true);
					}
				} else {
					// set driver and navigator
					// TODO ^
					console.log('starting round');
					setRoundInProgress(true);
					setTimerStatus(false);
					setStartEpoch(Date.now() / 1000);
				}
			}}>{$timerPausedStore ? 'Start' : 'Pause'}</button
		>
		<button class="btn join-item">Next</button>
=======
		<button class="btn btn-primary join-item">Pause</button>
		<button class="btn join-item">Skip</button>
>>>>>>> main
		<button class="btn join-item">Restart</button>
		<button class="btn join-item">Shuffle</button>
	</div>
</div>
