<script>
	import { goto } from '$app/navigation';
	import { generateRoomName } from '$lib/roomName';
	import 'iconify-icon';

	function createRoom() {
		goto(`/${generateRoomName()}`);
	}
</script>

<div class="mainpage flex-col mx-auto sm:w-[95%] lg:w-[80%]">
	<section
		class="flex flex-col gap-3 text-center mx-auto pb-20 h-screen items-center justify-center"
	>
		<h1
			class="md:text-6xl text-4xl pb-2 font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A00] to-[#FFA800]"
		>
			pairprogram.me
		</h1>
		<p class="md:text-2xl subheading text-xl pb-2 md:w-4/5">
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
				on:click={() => {
					const el = document.getElementById('pair-programming-explained');
					el?.scrollIntoView({ behavior: 'smooth' });
				}}>Read More</button
			>
		</div>
	</section>
	<section class="">
		<div
			class="relative pl-4 before:w-[2px] before:h-full before:bg-primary before:absolute before:left-0"
		>
			<h2 id="pair-programming-explained" class="text-4xl text-primary font-bold">
				What is Pair Programming?
			</h2>
			<p class="text-xl">
				Pair programming is an agile software development technique in which two programmers work
				together on the same codebase, with one actively writing code (the "driver") and the other
				actively reviewing the code and providing input (the "navigator"). This practice offers
				several benefits:
			</p>
		</div>

		<div class="join join-vertical w-full flex mx-auto my-8 px-2">
			<div class="collapse collapse-plus join-item border border-base-300">
				<input type="radio" name="my-accordion-3" />
				<div class="collapse-title text-xl font-medium">Enhanced Team Dynamics</div>
				<div class="collapse-content">
					<p>
						Pair programming fosters a sense of camaraderie and teamwork among developers which can
						lead to a more positive work environment. It can help in building stronger, more
						cohesive development teams.
					</p>
					<br />
					<p>
						Pair programming encourages effective communication and collaboration within the
						development team. It can help reduce misunderstandings and miscommunications, resulting
						in a more harmonious team environment.
					</p>
				</div>
			</div>
			<div class="collapse collapse-plus join-item border border-base-300">
				<input type="radio" name="my-accordion-3" />
				<div class="collapse-title text-xl font-medium">Improved Code Quality</div>
				<div class="collapse-content">
					<p>
						Two sets of eyes on code can help to improve code quality as potential bugs and issues
						are more likely to be caught early. Real-time code reviews help in identifying and
						fixing problems, improving code readability, and adhering to coding standards.
					</p>
				</div>
			</div>
			<div class="collapse collapse-plus join-item border border-base-300">
				<input type="radio" name="my-accordion-3" />
				<div class="collapse-title text-xl font-medium">Knowledge Sharing</div>
				<div class="collapse-content">
					<p>
						Pair programming promotes knowledge sharing and learning. Team members can share their
						expertise and learn from each other which can help level up the entire team. New team
						members can get up to speed faster by pairing with experienced developers.
					</p>
					<br />
					<p>
						By working together, pair programmers reduce the risk of knowledge silos, where one
						developer possesses critical knowledge that others do not. This makes the team more
						resilient to changes in team composition.
					</p>
				</div>
			</div>
			<div class="collapse collapse-plus join-item border border-base-300">
				<input type="radio" name="my-accordion-3" />
				<div class="collapse-title text-xl font-medium">Faster Problem Solving</div>
				<div class="collapse-content">
					<p>
						Collaboration often leads to faster problem-solving. When two programmers work together,
						they can discuss solutions and make decisions more quickly than if they were working
						individually. Brainstorming and discussing alternatives can lead to more efficient
						solutions.
					</p>
				</div>
			</div>

			<div class="collapse collapse-plus join-item border border-base-300">
				<input type="radio" name="my-accordion-3" />
				<div class="collapse-title text-xl font-medium">Onboarding and Mentoring</div>
				<div class="collapse-content">
					<p>
						Pair programming is an effective way to onboard new team members, allowing them to learn
						from experienced team members and become productive more quickly. It can also serve as a
						mentoring opportunity, with experienced developers coaching less experienced ones
					</p>
				</div>
			</div>
		</div>

		<a
			href="https://martinfowler.com/articles/on-pair-programming.html"
			target="_blank"
			class="block text-center pb-10"
		>
			<span class="text-2xl text-primary font-semibold">And many more</span>
			<iconify-icon icon="akar-icons:link-out" class="text-primary text-xl" />
		</a>
	</section>
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

	.collapse-content {
		width: 90%;
	}
</style>
