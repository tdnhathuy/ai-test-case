import type { Step1Data } from '@/modules/create-test-case/stores/create-test-case.store';

export function buildChecklistPrompt({ userStory, acceptanceCriteria }: Step1Data): string {
	return `
# SYSTEM MESSAGE
You are a senior QA engineer.
Decompose the provided User Story and Acceptance Criteria into a concise, actionable test checklist.
Return ONLY valid JSON that conforms to the response_schema (already supplied out-of-band).
Do not add code fences, comments, or extra text.
Keep titles ≤ 60 characters.  
Use priorities: P0 (critical), P1 (important), P2 (exploratory).

# User Story
${userStory}

# Acceptance Criteria
${acceptanceCriteria}

# Extra instructions
- Cover every AC plus at least one edge or security case you deem necessary.  
- Map each checklist item to its AC number or “exploratory”.
`;
}
