// assets/api.js
// 用你的 Apps Script Web App /exec 地址
const API_BASE = 'https://script.google.com/macros/s/AKfycbxDO3Aj81SukRrEJcDmT9QkLB1lMq9XHY8eP_fi9fpSvEXsz9Hl2QwsMqST2pO5P9NH/exec';

/** 只检查是否存在（不创建） */
async function apiCheckId(userId) {
  try {
    const url = `${API_BASE}?user_id=${encodeURIComponent(String(userId))}&check=1`;
    const r = await fetch(url);
    return await r.json(); // { ok:true, exists:true|false }
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

/** 读取（不存在会在后端新建并返回初始存档） */
async function apiLoadProgress(userId) {
  try {
    const url = `${API_BASE}?user_id=${encodeURIComponent(String(userId))}`;
    const r = await fetch(url); // GET
    return await r.json(); // { ok:true, user_id, progress }
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

/**
 * 保存整份 progress（后端 upsert）
 * 关键点：不设置 Content-Type，避免 CORS 预检(OPTIONS)
 */
async function apiSaveProgress(userId, progress) {
  try {
    const r = await fetch(API_BASE, {
      method: 'POST',
      // 不要设置 headers: {'Content-Type':'application/json'}
      body: JSON.stringify({ user_id: String(userId), progress })
    });
    return await r.json(); // { ok:true }
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}
