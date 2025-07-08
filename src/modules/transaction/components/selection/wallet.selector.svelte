<script lang="ts">
	import { useGetListWallet } from '@/lib/common/services';
	import type { Transaction, Wallet } from '@/lib/common/types';
	import {
		Popover,
		PopoverClose,
		PopoverContent,
		PopoverTrigger
	} from '@/lib/components/ui/popover';
	import { ScrollArea } from '@/lib/components/ui/scroll-area';
	import { WiseButton, WiseIcon } from '@/lib/components/wise';
	import { WrapperSelector } from '@/modules/transaction/components/selection';

	type Props = {
		transaction?: Transaction;
	};
	let { transaction = $bindable() }: Props = $props();

	const queryWallet = useGetListWallet();

	const listWallet = $derived($queryWallet.data ?? []);

	const icon = $derived(transaction?.wallet?.icon ?? null);
	const title = $derived(transaction?.wallet?.name ?? 'Chưa chọn ví');

	const onSelectWallet = (wallet: Wallet) => {
		if (transaction) {
			transaction.wallet = wallet;
		}
	};
</script>

<Popover>
	<PopoverTrigger class="w-full">
		<WrapperSelector {icon} {title} />
	</PopoverTrigger>

	<PopoverContent class="flex h-48 w-fit gap-2 p-2  pr-1">
		{@render renderListCategory(listWallet)}
	</PopoverContent>
</Popover>

{#snippet renderListCategory(listCategory: Wallet[])}
	<ScrollArea class="flex w-48 flex-1 flex-col pr-4" orientation="vertical">
		<ul class="flex w-full flex-1/2 flex-col gap-1">
			{#each listCategory as category}
				<PopoverClose onclick={() => onSelectWallet(category)}>
					<WiseButton variant="ghost" class="w-full justify-start">
						<WiseIcon icon={category.icon} size="sm" />
						<span>{category.name}</span>
					</WiseButton>
				</PopoverClose>
			{/each}
		</ul>
	</ScrollArea>
{/snippet}
