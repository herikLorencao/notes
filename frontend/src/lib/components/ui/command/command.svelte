<script lang="ts">
	import { Command as CommandPrimitive } from 'cmdk-sv';
	import { cn } from '$lib/utils.js';

	type $$Props = CommandPrimitive.CommandProps;

	export let value: $$Props['value'] = undefined;

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<CommandPrimitive.Root
	{...$$restProps}
	bind:value
	class={cn(
		"bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
		className
	)}
>
	<slot />
</CommandPrimitive.Root>
