<script lang="ts">
	import { Command as CommandPrimitive } from 'cmdk-sv';
	import { cn } from '$lib/utils.js';

	type $$Props = CommandPrimitive.ListProps;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<CommandPrimitive.List
	{...$$restProps}
	class={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
>
	<slot />
</CommandPrimitive.List>
