<script lang="ts">
	import { Menubar as MenubarPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	type $$Props = MenubarPrimitive.ContentProps;
	type $$Events = MenubarPrimitive.ContentEvents;

	let className: $$Props['class'] = undefined;
	export let sideOffset: $$Props['sideOffset'] = 8;
	export let alignOffset: $$Props['alignOffset'] = -4;
	export let align: $$Props['align'] = 'start';
	export let side: $$Props['side'] = 'bottom';
	export let transitionConfig: $$Props['transitionConfig'] = undefined;
	export { className as class };
</script>

<MenubarPrimitive.Content
	{...$$restProps}
	{align}
	{alignOffset}
	class={cn(
		"bg-popover text-popover-foreground z-50 min-w-[12rem] rounded-md border p-1 shadow-md focus:outline-none",
		className
	)}
	on:keydown
	{side}
	{sideOffset}
	{transitionConfig}
>
	<slot />
</MenubarPrimitive.Content>
