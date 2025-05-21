<script>
	import { Button } from '@/lib/components/ui/button';
	import { SignIn } from '@auth/sveltekit/components';
</script>

<SignIn provider="google" class="">
	<Button slot="submitButton">
		<span>Login</span>
	</Button>
</SignIn>
