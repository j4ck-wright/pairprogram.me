<script lang="ts">
	import { driverStore, navigatorStore, watchDriver, watchNavigator } from '$lib/firebase';
	watchDriver();
	watchNavigator();
</script>

<div class="driver">
	<p>Driver:</p>
	<p class="outline lg:w-1/2">{$driverStore || 'None'}</p>
</div>
<div class="navigator mt-2">
	<p>Navigator:</p>
	<p class="outline lg:w-1/2">{$navigatorStore || 'None'}</p>
</div>

<style>
	.outline {
		outline: solid;
		outline-width: 1px;
		padding: 0.5rem;
		height: 2.25rem;
	}
</style>
