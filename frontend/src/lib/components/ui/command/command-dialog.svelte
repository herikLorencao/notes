<script lang="ts">
	import type { Dialog as DialogPrimitive } from 'bits-ui';
	import type { Command as CommandPrimitive } from 'cmdk-sv';
	import Command from './command.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';

	type $$Props = DialogPrimitive.Props & CommandPrimitive.CommandProps;

	export let open: $$Props['open'] = false;
	export let value: $$Props['value'] = undefined;
</script>

<Dialog.Root {...$$restProps} bind:open>
	<Dialog.Content class="overflow-hidden p-0 shadow-lg">
		<Command
			{...$$restProps}
			bind:value
			class="[&_[data-cmdk-group-heading]]:text-muted-foreground [&_[data-cmdk-group-heading]]:px-2 [&_[data-cmdk-group-heading]]:font-medium [&_[data-cmdk-group]:not([hidden])_~[data-cmdk-group]]:pt-0 [&_[data-cmdk-group]]:px-2 [&_[data-cmdk-input-wrapper]_svg]:h-5 [&_[data-cmdk-input-wrapper]_svg]:w-5 [&_[data-cmdk-input]]:h-12 [&_[data-cmdk-item]]:px-2 [&_[data-cmdk-item]]:py-3 [&_[data-cmdk-item]_svg]:h-5 [&_[data-cmdk-item]_svg]:w-5"
		>
			<slot />
		</Command>
	</Dialog.Content>
</Dialog.Root>
