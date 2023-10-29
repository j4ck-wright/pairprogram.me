<script>
	import { goto } from '$app/navigation';
	import { generateRoomName } from '$lib/roomName';

	function createRoom() {
		goto(`/${generateRoomName()}`);
	}
</script>

<div
	class="flex flex-col gap-3 text-center mx-auto pb-20 h-screen w-[70%] items-center justify-center"
>
	<h1
		class="text-6xl pb-2 font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A00] to-[#FFA800]"
	>
		pairprogram.me
	</h1>
	<p class="subheading text-2xl pb-2">
		Pair Programming enhances team collaboration, accelerates development, reduces errors, and
		fosters innovation.
	</p>
	<div class="buttons flex gap-4 justify-center">
		<button
			class="button text-white bg-primary hover:bg-transparent hover:text-primary hover:outline transition-all"
			on:click|once={createRoom}>Get Started</button
		>
		<button
			class="button text-primary bg-none outline-primary hover:text-white hover:bg-primary transition-all"
			>Read More</button
		>
	</div>
</div>

<style>
	.button {
		padding: 0.5rem 1rem 0.5rem 1rem;
		padding-left: 1rem;
		padding-right: 1rem;
		font-size: 1.25rem;
		line-height: 1.75rem;
		font-weight: 700;
		min-width: 8rem;
		outline-style: solid;
	}

	.subheading {
		text-wrap: balance;
	}
</style>
