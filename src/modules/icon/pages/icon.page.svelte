<script lang="ts">
	import { flatIcon } from '@/lib/common/configs/cdn.config';
	import { convertIdFlatIcon } from '@/lib/common/helpers';
	import { Stack, WiseButton, WiseInput } from '@/lib/components/wise';
	import { values } from 'lodash';

	let iconId = $state('');
	let iconUrl = $state('');

	export function flaticonUrl(iconId: string) {
		flatIcon;
		iconUrl = convertIdFlatIcon(iconId);
	}
</script>

<section>
	<WiseButton
		onclick={() => {
			const arr = values(flatIcon).map((id) => convertIdFlatIcon(id));
			console.log('arr', arr);
		}}>Demo</WiseButton
	>

	<Stack class="w-lg gap-2">
		<WiseButton onclick={() => flaticonUrl(iconId)}>Tạo URL</WiseButton>

		<WiseInput placeholder="Icon ID" bind:value={iconId} />
		<WiseInput placeholder="Icon URL" bind:value={iconUrl} readonly />

		<img src={iconUrl} alt="Icon" />
	</Stack>
	<!-- <ButtonCreateIconCollection />
	<ListIconCollection /> -->
</section>
