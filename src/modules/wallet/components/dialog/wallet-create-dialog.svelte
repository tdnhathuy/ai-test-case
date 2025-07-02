<script lang="ts">
	import { queryClient } from '@/lib/common/configs/query-client.config';
	import { QueryKeys } from '@/lib/common/constant/key.const';
	import { genMongoId } from '@/lib/common/helpers';
	import { useCreateWallet } from '@/lib/common/services/mutations/app.muation';
	import type { PayloadCreateWallet } from '@/lib/common/services/wallet.service';
	import type { Icon, Wallet } from '@/lib/common/types/app.type';
	import ButtonBase from '@/lib/components/svelte/button/button-base.svelte';
	import LabelSection from '@/lib/components/svelte/label-section.svelte';
	import { DialogClose, DialogFooter } from '@/lib/components/ui/dialog';
	import { WiseIconSelector } from '@/lib/components/wise';
	import WiseDialogContent from '@/lib/components/wise/dialog/wise-dialog-content.svelte';
	import WiseInput from '@/lib/components/wise/wise-input.svelte';

	let ref: HTMLButtonElement | null = $state(null);

	const mutation = useCreateWallet();

	let icon = $state<Icon | undefined>(undefined);
	let wallet = $state<Wallet>({
		id: genMongoId(),
		name: '',
		icon: {
			id: '',
			code: '',
			type: '',
			url: ''
		},
		initBalance: 0
	});

	const onPressSave = async () => {
		const payload: PayloadCreateWallet = {
			balance: 0,
			name: wallet.name,
			icon: icon?.id ?? ''
		};
		await $mutation.mutateAsync(payload, {
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [QueryKeys.getWallet] });
				ref?.click();
			}
		});
	};
</script>

<WiseDialogContent title="Tạo ví" {footer} class="flex flex-col gap-4">
	<WiseIconSelector bind:icon />
	<span class="flex flex-col gap-4">
		<LabelSection label="Tên ví" class="w-full">
			<WiseInput type="text" placeholder="Tên ví" bind:value={wallet.name} />
		</LabelSection>

		<LabelSection label="Số dư" class="w-full">
			<WiseInput type="number" placeholder="Số dư" bind:value={wallet.initBalance} />
		</LabelSection>
	</span>
</WiseDialogContent>

{#snippet footer()}
	<DialogFooter>
		<DialogClose>
			<ButtonBase>Huỷ</ButtonBase>
		</DialogClose>
		<ButtonBase onclick={onPressSave} loading={$mutation.isPending}>Lưu</ButtonBase>
	</DialogFooter>
{/snippet}

<DialogClose class="hidden" bind:ref />
