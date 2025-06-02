/* ====== Kiểu dữ liệu hỗ trợ ====== */
export interface ImageInfo {
	fileName: string; // Tên file hoặc URL ảnh
	description: string; // Mô tả ngắn gọn
}

export interface BuildPromptParams {
	projectDescription: string; // Mô tả tổng quan dự án
	userStories: string; // Yêu cầu / user-stories dạng text thô
	images?: ImageInfo[]; // Danh sách hình ảnh (tuỳ chọn)
}

/* ====== Hàm tạo prompt ====== */
export function buildChecklistPrompt({
	projectDescription,
	userStories,
	images = []
}: BuildPromptParams): string {
	const imageBlock = images.length
		? images.map((img) => `  – ${img.fileName}:  ${img.description}`).join('\n')
		: '  (no images provided)';

	return `
  You are a senior QA engineer. From the **project description** and any **images** I give you,
  create a structured set of checklists for software testing.
  
  =====================  CONTEXT  =====================
  • Overall project goal:  ${projectDescription}
  • Key user stories / requirements (raw text):
    ${userStories}
  • Image list (if any):
  ${imageBlock}
  =====================================================
  
  ### OUTPUT RULES
  1. Analyse the inputs and group checklist items by **feature / functional module**.
  2. Each checklist item must be:
     • Atomic (testable in một bước)
     • Written as an action or expectation, e.g. “Button X is disabled when …”.
  3. Use very concise, unambiguous language suitable for testers.
  4. The final answer **MUST** be valid JSON only (no Markdown, no comments).
  5. Conform exactly to the TypeScript types given below.
  
  ### TYPES (for reference)
  [
    {
      "id": "string",
      "feature": "string",
      "description": "string",
      "items": [
        {
          "id": "string",
          "name": "string",
          "description": "string",
        }
      ]
    }
  ]
  
  ### NAMING & IDs
  - Use camelCase slugs for ids (e.g. "loginForm", "loginForm_requiredFields").
  - \`feature\` should be ≤ 35 chars; \`name\` ≤ 50 chars.
  - If an item derives from an image, fill \`sourceImage\` with the file-name.
  
  Return the data. Do **NOT** wrap with \`\`\`json markdown fences.
  Do **NOT** wrap with json markdown fences
  Response on Vietnamese language.
  `.trim();
}
