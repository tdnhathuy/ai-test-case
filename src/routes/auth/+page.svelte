<script>
	import { WiseBackground, WiseButton } from '@/lib/components/wise';
	import { SignIn } from '@auth/sveltekit/components';
</script>

<WiseBackground class="flex items-center justify-center">
	<SignIn provider="google" class="" options={{ redirectTo: '/' }}>
		<WiseButton variant="outline" slot="submitButton" class="bg-white text-black" size="lg">
			<span>Login with Google</span>
		</WiseButton>
	</SignIn>
</WiseBackground>
