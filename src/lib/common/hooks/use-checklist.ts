import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
import { createChecklist } from '@/lib/services/api.service';
import type { Checklist } from '@/lib/types/app.type';

/* ========= Hàm parse ========= */
export function parseChecklist(raw: string): Checklist[] {
	// 1) Cắt khoảng trắng đầu/cuối
	let cleaned = raw.trim();

	// 2) Nếu AI trả về kèm ```json … ``` thì loại bỏ
	if (cleaned.startsWith('```')) {
		cleaned = cleaned
			.replace(/^```(?:json)?/i, '')
			.replace(/```$/, '')
			.trim();
	}

	// 3) Thử parse
	try {
		return JSON.parse(cleaned) as Checklist[];
	} catch (err) {
		// Ghi log chi tiết và ném lỗi ra ngoài để caller xử lý
		console.error('❌  Không parse được JSON checklist:', err);
		throw new Error('Invalid JSON returned from LLM');
	}
}

export function useCreateChecklist() {
	return createMutation({ mutationFn: createChecklist });
}

// Hook để lấy lịch sử checklist (có thể implement sau)
export function useChecklistHistory() {
	return createQuery({
		queryKey: ['checklist-history'],
		queryFn: async () => {
			// Placeholder - có thể implement API endpoint để lấy lịch sử
			return [];
		},
		enabled: false // Disable query này vì chưa có API endpoint
	});
}
