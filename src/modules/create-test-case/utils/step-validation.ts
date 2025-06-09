import type { CreateTestCaseData } from '../stores/create-test-case.store';

export const validateStep = (step: number, data: CreateTestCaseData) => {
	return (step === 2 && data.step1?.description) || (step === 3 && data.step2?.requirements);
};
