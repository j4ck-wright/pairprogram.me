<script lang="ts">
	import { driverStore, navigatorStore, watchDriver, watchNavigator } from '$lib/firebase';
	watchDriver();
	watchNavigator();
</script>

<div class="driver">
	<p>Driver:</p>
	<p class="outline">{$driverStore || 'None'}</p>
</div>
<div class="navigator mt-2">
	<p>Navigator:</p>
	<p class="outline">{$navigatorStore || 'None'}</p>
</div>

<style>
	.outline {
		width: 50%;
		outline: solid;
		outline-width: 1px;
		padding: 0.5rem;
		height: 2.25rem;
	}
</style>
