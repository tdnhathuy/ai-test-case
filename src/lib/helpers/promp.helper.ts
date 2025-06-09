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

export interface ChecklistItem {
	id: string;
	name: string;
	description: string;
	sourceImage?: string;
}

export interface ChecklistFeature {
	id: string;
	feature: string;
	description: string;
	items: ChecklistItem[];
}

export type ChecklistResponse = ChecklistFeature[];

/* ====== Hàm tạo prompt ====== */
export function buildChecklistPrompt({
	projectDescription,
	userStories,
	images = []
}: BuildPromptParams): string {
	const imageBlock = images.length
		? images.map((img) => `  – ${img.fileName}:  ${img.description}`).join('\n')
		: '  (no images provided)';

	const exampleJson = `[
  {
    "id": "loginForm",
    "feature": "Đăng nhập",
    "description": "Kiểm tra chức năng đăng nhập",
    "items": [
      {
        "id": "loginForm_requiredFields",
        "name": "Validate trường bắt buộc",
        "description": "Email và password phải được nhập"
      }
    ]
  }
]`;

	return `
Bạn là một QA engineer senior. Từ mô tả dự án và hình ảnh tôi cung cấp,
tạo danh sách kiểm tra có cấu trúc cho việc test phần mềm.

=====================  CONTEXT  =====================
• Mục tiêu dự án: ${projectDescription}
• User stories/yêu cầu chính:
${userStories}
• Danh sách hình ảnh:
${imageBlock}
=====================================================

### QUY TẮC OUTPUT
1. Phân tích đầu vào và nhóm các mục kiểm tra theo **tính năng/module**.
2. Mỗi mục kiểm tra phải:
   • Atomic (có thể test trong một bước)
   • Viết dưới dạng hành động hoặc kỳ vọng
3. Sử dụng ngôn ngữ ngắn gọn, rõ ràng phù hợp cho tester.
4. **BẮT BUỘC**: Trả về CHÍNH XÁC định dạng JSON như ví dụ dưới đây.
5. KHÔNG thêm markdown, comment, hoặc text nào khác ngoài JSON.

### EXAMPLE JSON FORMAT:
${exampleJson}

### YÊU CẦU JSON:
- Sử dụng camelCase cho ids
- feature ≤ 35 ký tự; name ≤ 50 ký tự
- Response phải là valid JSON array
- Không wrap trong \`\`\`json

BẮT ĐẦU JSON RESPONSE:`.trim();
}

export function parseAIResponse(response: string): ChecklistResponse {
	try {
		const cleanResponse = response.trim();
		
		let jsonText = cleanResponse;
		if (cleanResponse.includes('```json')) {
			const match = cleanResponse.match(/```json\s*([\s\S]*?)\s*```/);
			if (match) {
				jsonText = match[1];
			}
		}
		
		if (cleanResponse.includes('```')) {
			const match = cleanResponse.match(/```\s*([\s\S]*?)\s*```/);
			if (match) {
				jsonText = match[1];
			}
		}
		
		const startIndex = jsonText.indexOf('[');
		const endIndex = jsonText.lastIndexOf(']');
		if (startIndex !== -1 && endIndex !== -1) {
			jsonText = jsonText.substring(startIndex, endIndex + 1);
		}
		
		const parsed = JSON.parse(jsonText);
		
		if (!Array.isArray(parsed)) {
			throw new Error('Response phải là một array');
		}
		
		return parsed as ChecklistResponse;
	} catch (error) {
		throw new Error(`Không thể parse JSON response: ${error}`);
	}
}

export function validateChecklistResponse(data: any): data is ChecklistResponse {
	if (!Array.isArray(data)) return false;
	
	return data.every((feature: any) => {
		return (
			typeof feature.id === 'string' &&
			typeof feature.feature === 'string' &&
			typeof feature.description === 'string' &&
			Array.isArray(feature.items) &&
			feature.items.every((item: any) => {
				return (
					typeof item.id === 'string' &&
					typeof item.name === 'string' &&
					typeof item.description === 'string'
				);
			})
		);
	});
}
