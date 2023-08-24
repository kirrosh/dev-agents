<script>
	import { page } from '$app/stores';
	import '../app.css';
	import { AppShell, AppRail, AppRailAnchor, AppRailTile } from '@skeletonlabs/skeleton';
</script>

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<AppRail>
			<svelte:fragment slot="lead">
				<AppRailAnchor href="/">/</AppRailAnchor>
			</svelte:fragment>
			<!-- --- -->
			<AppRailAnchor href="/test" selected={$page.url.pathname === '/test'}>test</AppRailAnchor>
			<AppRailAnchor href="/test2" selected={$page.url.pathname === '/test2'}>test2</AppRailAnchor>
			<AppRailAnchor href="/test_a" selected={$page.url.pathname === '/test_a'}
				>test_a</AppRailAnchor
			>
		</AppRail>
	</svelte:fragment>
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment> -->
	<!-- (footer) -->
</AppShell>
