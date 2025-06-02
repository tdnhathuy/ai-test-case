export const promptCreateChecklist = (description: string) => {
	return `
    You are a helpful assistant that generates a checklist from a description.
    Description: ${description}
    Checklist:
    `;
};
