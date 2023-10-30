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
		setRoundInProgress,
		participantsStore,
		driverStore,
		setDriver,
		setNavigator,
		setParticipants
	} from '$lib/firebase';
	import { shuffle } from '$lib/components/ActiveParticipants/shuffle';
	import { newActiveParticipants } from '$lib/components/ActiveParticipants/newActiveParticipants';
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
		}
	}

	function getTimePercentage() {
		const secondsRemaining = formattedTimeToSeconds(time);
		timePercentage = (secondsRemaining / ($timerIntervalMinutesStore * 60)) * 100;
	}

	function formatRemainingTime(remainingTime: number) {
		if (remainingTime <= 0) return '00:00';
		const minutes = Math.floor(remainingTime / 60);
		const seconds = Math.floor(remainingTime % 60);

		return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	}

	function formattedTimeToSeconds(formattedTime: string) {
		const split = formattedTime.split(':');
		const minutes = parseInt(split[0]);
		const seconds = parseInt(split[1]);
		return minutes * 60 + seconds;
	}

	function startNewRound() {
		const { driver, navigator } = newActiveParticipants($participantsStore || [], $driverStore);
		setDriver(driver || 'None');
		setNavigator(navigator || 'None');
		setRoundInProgress(true);
		setTimerStatus(false);
		setStartEpoch(Date.now() / 1000);
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
					}
				}
			} else {
				timePercentage = 100;
				time = `${$timerIntervalMinutesStore < 10 ? '0' : ''}${$timerIntervalMinutesStore}:00`;
			}
		}, 100);
	});

	onDestroy(() => {
		clearInterval(timerInterval);
	});

	watchStartEpoch();
	watchTimerStatus();
	watchPausedTimestamp();
	watchRoundInProgress();
</script>

<div class="container">
	<div class="timer-container flex justify-end">
		<div
			class="radial-progress text-primary font-bold text-4xl flex m-auto items-center"
			style="--value:{timePercentage}; --size:21rem; --thickness: 0.5rem;"
		>
			{time}
		</div>
	</div>

	<div class="join mt-6 flex-col w-full lg:flex-row justify-center">
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
					startNewRound();
				}
			}}>{$timerPausedStore ? 'Start' : 'Pause'}</button
		>
		<button
			class="btn join-item"
			on:click={() => {
				startNewRound();
			}}>Next</button
		>
		<button
			class="btn join-item"
			on:click={() => {
				setStartEpoch(Date.now() / 1000);
				time = `${$timerIntervalMinutesStore < 10 ? '0' : ''}${$timerIntervalMinutesStore}:00`;
				timePercentage = 100;
			}}>Restart</button
		>
		<button
			class="btn join-item"
			on:click={() => {
				setStartEpoch(0);
			}}>Stop</button
		>
		<button
			class="btn join-item"
			on:click={() => {
				const shuffledParticipants = shuffle($participantsStore);
				setParticipants(shuffledParticipants);
			}}>Shuffle</button
		>
	</div>
</div>
