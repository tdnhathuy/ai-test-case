<script>
	import { DialogClose, DialogFooter } from './ui/dialog';
	import { WiseButton, WiseDialogContent } from './wise';
	import { signOut } from '@auth/sveltekit/client';

	const handleLogout = () => {
		signOut({ redirectTo: '/' });
	};
</script>

<WiseDialogContent title="Đăng xuất" hideCloseButton {footer} class="w-96">
	<span>Bạn có muốn đăng xuất ?</span>
</WiseDialogContent>

{#snippet footer()}
	<DialogFooter>
		<DialogClose>
			<WiseButton class="w-24" variant="outline">Hủy</WiseButton>
		</DialogClose>
		<WiseButton class="w-24" variant="destructive" onclick={handleLogout}>Đăng xuất</WiseButton>
	</DialogFooter>
{/snippet}
