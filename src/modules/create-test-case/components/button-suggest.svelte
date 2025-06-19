<script lang="ts">
	import ButtonBase from '@/lib/components/svelte/button/button-base.svelte';
	import type { Suggestion } from '@/modules/create-test-case/components/button-suggest.type';
	import { createTestCaseStore } from '@/modules/create-test-case/stores/create-test-case.store';
	const suggestions: Suggestion[] = [
		{
			title: 'Login Feature',
			userStory:
				'As a registered user, I want to log in to the application so that I can securely access my personal dashboard and data.',
			acceptanceCriteria: `1. Successful login
Given I am on the login page and already have a valid account
When I enter the correct email and password and click Login
Then the system authenticates me and redirects me to the Dashboard within 2 seconds

2. Failed login with incorrect credentials
Given I am on the login page
When I enter an incorrect email or password and click Login
Then I remain on the login page and see an inline error message: “Email or password is incorrect”

3. Rate-limit after multiple failures
Given I have entered incorrect credentials 5 times within 10 minutes
When I attempt to log in a 6th time
Then my account is temporarily locked for 15 minutes, and an explanatory message is displayed

4. Password masking
Given I am in the password field on the login page
When I type my password
Then each character is masked with a bullet (•) symbol so that the actual characters are not visible
`
		},
		{
			title: 'Create User',
			userStory:
				'As a system administrator, I want to create a new user account so that I can grant application access to new employees.',
			acceptanceCriteria: `1. Successful user creation
Given I am an authenticated administrator on the Create User form
When I complete all required fields with valid data and click Save
Then the system creates a new user record, shows a success toast/notification, and the user appears in the Users list

2. Email must be unique
Given the email address I enter already exists in the system
When I click Save
Then an inline error message “Email already in use” is shown, and the user is not created

3. Required-field validation
Given I leave one or more required fields blank
When I click Save
Then validation messages indicate the missing fields, and the user is not created

4. Password policy compliance
Given I enter a password that does not meet the policy (minimum 8 characters, at least one number and one uppercase letter)
When I click Save
Then an inline error explains the password requirements, and the user is not created

5. Welcome email notification
Given I have successfully created a new user
When the account is created
Then the system sends the new user a welcome email with a link to set their password`
		}
	];

	const onClickSuggest = (suggestion: Suggestion) => {
		createTestCaseStore.updateStep1({
			userStory: suggestion.userStory,
			acceptanceCriteria: suggestion.acceptanceCriteria
		});
	};
</script>

<div class="flex h-fit gap-2">
	<span class="mt-1">Suggest: </span>
	<span class="flex flex-wrap gap-2">
		{#each suggestions as suggestion}
			<ButtonBase size="sm" variant="outline" onclick={() => onClickSuggest(suggestion)}
				>{suggestion.title}</ButtonBase
			>
		{/each}
	</span>
</div>
