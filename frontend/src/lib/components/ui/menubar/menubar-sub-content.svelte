<script lang="ts">
	import { Menubar as MenubarPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	type $$Props = MenubarPrimitive.SubContentProps;
	type $$Events = MenubarPrimitive.SubContentEvents;

	let className: $$Props['class'] = undefined;
	export let transitionConfig: $$Props['transitionConfig'] = { x: -10, y: 0 };
	export { className as class };
</script>

<MenubarPrimitive.SubContent
	{...$$restProps}
	class={cn(
		"bg-popover text-popover-foreground z-50 min-w-max rounded-md border p-1 focus:outline-none",
		className
	)}
	on:focusout
	on:keydown
	on:pointermove
	{transition}
	{transitionConfig}
>
	<slot />
</MenubarPrimitive.SubContent>
