<script>
	import { Button } from '@/lib/components/ui/button';
	import { SignIn } from '@auth/sveltekit/components';
</script>

<SignIn provider="google" class="bg-red-300" options={{ redirectTo: '/' }}>
	<Button slot="submitButton">
		<span>Login</span>
	</Button>
</SignIn>
