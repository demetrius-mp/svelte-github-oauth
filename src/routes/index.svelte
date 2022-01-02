<script context="module">
	export async function load({ session }) {
		return {
			props: {
				user: session.user
			}
		};
	}
</script>

<script>
	export let user;
</script>

<h1>Welcome to SvelteKit</h1>
<p>
	Visit
	<a href="https://kit.svelte.dev">kit.svelte.dev</a>
	to read the documentation
</p>
{#if user}
	<h2>Welcome {user}</h2>
	<a rel="external" href="/auth/logout">
		<button>Logout</button>
	</a>
{:else}
	<a rel="external" href="/auth/login">
		<button>Login using Github</button>
	</a>
{/if}
