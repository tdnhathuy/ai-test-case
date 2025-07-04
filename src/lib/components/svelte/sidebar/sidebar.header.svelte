<script lang="ts">
	import { Header } from '$lib/components/ui/sidebar/index.js';
	import {
		ServiceCategory,
		ServiceIcon,
		ServiceProfile,
		ServiceWallet
	} from '@/lib/common/services';
	import LabelSection from '@/lib/components/svelte/label-section.svelte';
	import SidebarButton from '@/lib/components/svelte/sidebar/sidebar-button.svelte';
	import { route } from '@/lib/ROUTES';
	import { Home, LayoutGrid, LayoutList, User, Wallet } from '@lucide/svelte';
</script>

<Header class="">
	<LabelSection label="Pages">
		<a href={route('/')}>
			<SidebarButton icon={Home} label="Home" />
		</a>

		<a href={route('/transaction')}>
			<SidebarButton icon={LayoutList} label="Transaction" />
		</a>

		<a href={route('/category')}>
			<SidebarButton icon={LayoutGrid} label="Category" />
		</a>
		<a href={route('/wallet')}>
			<SidebarButton icon={Wallet} label="Wallet" />
		</a>
		<a href={route('/icon')}>
			<SidebarButton icon={Wallet} label="Icon" />
		</a>
	</LabelSection>

	<LabelSection label="Functions">
		<SidebarButton
			icon={User}
			label="Setup profile"
			onclick={async () => {
				await ServiceProfile.setupProfile(true);
			}}
		/>
		<SidebarButton
			icon={User}
			label="Get category"
			onclick={async () => {
				await ServiceCategory.getCategory();
			}}
		/>

		<SidebarButton
			icon={User}
			label="Get Icon"
			onclick={async () => {
				await ServiceIcon.getIcon();
			}}
		/>
		<SidebarButton
			icon={User}
			label="Get Wallet"
			onclick={async () => {
				await ServiceWallet.getWallet();
			}}
		/>
	</LabelSection>
</Header>
