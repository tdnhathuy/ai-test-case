<script>
	import { Button } from '@/lib/components/ui/button';
	import { WiseButton } from '@/lib/components/wise';
	import { cn } from '@/lib/utils';
	import { SignIn } from '@auth/sveltekit/components';
</script>

<section
	class={cn(
		'flex h-screen w-screen flex-col items-center justify-center',
		'bg-gradient-to-tr from-blue-500 to-purple-500'
	)}
>
	<SignIn provider="google" class="" options={{ redirectTo: '/' }}>
		<WiseButton variant="outline" slot="submitButton" class="bg-white text-black" size="lg">
			<span>Login with Google</span>
		</WiseButton>
	</SignIn>
</section>
