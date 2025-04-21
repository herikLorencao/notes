<script lang="ts">
	import { Toggle } from '$lib/components/ui/toggle';
	import * as Menubar from '$lib/components/ui/menubar';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Command from '$lib/components/ui/command';

	let darkModeEnable = $state(true);

	function changeThemeMode() {
		darkModeEnable = !darkModeEnable;
	}
</script>

<header class="flex items-center border-b-2 border-gray-200 dark:border-gray-800">
	<nav class="flex justify-between items-center h-12 w-full">
		<section class="flex items-center h-full">
			<Menubar.Root>
				<Menubar.Menu>
					<Menubar.Trigger>Opções</Menubar.Trigger>
					<Menubar.Content>
						<Menubar.Item>
							Nova Nota
							<Menubar.Shortcut>⌘N</Menubar.Shortcut>
						</Menubar.Item>
						<Menubar.Item>Novo Grupo</Menubar.Item>
						<Menubar.Separator />
						<Menubar.Item>Sobre</Menubar.Item>
					</Menubar.Content>
				</Menubar.Menu>
			</Menubar.Root>
		</section>

		<section class="flex justify-center z-10">
		</section>

		<section class="flex">
			<a href="/">
				<Avatar.Root>
					<Avatar.Image alt="@shadcn" src="https://github.com/shadcn.png" />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
			</a>
			<Toggle class="mx-2" on:click={changeThemeMode}>
				{#if darkModeEnable}
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
							 stroke="currentColor" class="size-6">
						<path stroke-linecap="round" stroke-linejoin="round"
									d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
					</svg>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
							 stroke="currentColor" class="size-6">
						<path stroke-linecap="round" stroke-linejoin="round"
									d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
					</svg>
				{/if}

			</Toggle>
		</section>
	</nav>
</header>