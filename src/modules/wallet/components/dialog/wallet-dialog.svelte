<script lang="ts">
	import type { Icon, Wallet } from '@/lib/common/types/app.type';
	import ButtonBase from '@/lib/components/svelte/button/button-base.svelte';
	import LabelSection from '@/lib/components/svelte/label-section.svelte';
	import { DialogClose, DialogFooter } from '@/lib/components/ui/dialog';
	import { WiseIconSelector } from '@/lib/components/wise';
	import WiseDialogContent from '@/lib/components/wise/dialog/wise-dialog-content.svelte';
	import WiseInput from '@/lib/components/wise/wise-input.svelte';

	let ref: HTMLButtonElement | null = $state(null);

	type Props = {
		wallet: Wallet;
	};

	const props: Props = $props();

	let wallet = $state(props.wallet);
	let icon: Icon = $state({ url: wallet.icon, id: wallet.icon, code: '' });
</script>

<WiseDialogContent title="Tạo ví" {footer} class="flex flex-col gap-4">
	<WiseIconSelector bind:icon />
	<span class="flex flex-col gap-4">
		<LabelSection label="Tên ví" class="w-full">
			<WiseInput type="text" placeholder="Tên ví" bind:value={wallet.name} />
		</LabelSection>

		<LabelSection label="Số dư" class="w-full">
			<WiseInput type="number" placeholder="Số dư" bind:value={wallet.balance} />
		</LabelSection>
	</span>
</WiseDialogContent>

{#snippet footer()}
	<DialogFooter>
		<DialogClose>
			<ButtonBase>Huỷ</ButtonBase>
		</DialogClose>
		<!-- <ButtonBase onclick={onPressSave} loading={$mutation.isPending}>Lưu</ButtonBase> -->
	</DialogFooter>
{/snippet}

<DialogClose class="hidden" bind:ref />
