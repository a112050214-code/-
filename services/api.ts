
import { ApiResponse, Language } from '../types';

const BASE_URL = 'https://www.travel.taipei/open-api';

/**
 * 取得臺北市景點清單
 * 使用 corsproxy.io 作為代理轉發，解決純前端呼叫時的 CORS 限制問題。
 */
export const fetchAttractions = async (lang: Language, page: number): Promise<ApiResponse> => {
  // 原本的目標網址
  const targetUrl = `${BASE_URL}/${lang}/Attractions/All?page=${page}`;
  
  // 使用代理伺服器封裝網址
  const proxiedUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
  
  try {
    const response = await fetch(proxiedUrl, {
      method: 'GET',
      headers: {
        // 精確對齊規格要求的標頭
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      // 處理 401, 404, 500 等 HTTP 錯誤
      throw new Error(`伺服器回應錯誤 (代碼: ${response.status})`);
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error('API 請求失敗:', error);
    // 拋出更直觀的錯誤訊息給 UI 層
    throw new Error('無法與 API 伺服器連線。這通常是 CORS 限制或網路連線問題，已嘗試透過代理連線。');
  }
};
