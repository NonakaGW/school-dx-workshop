(() => {
  // この研修サイトの練習フォーム専用です。
  const form = document.getElementById('training-form');
  if (document.body.dataset.demoPage !== 'school-form' || !form) {
    alert('このコードは研修用の練習フォームでのみ実行してください。');
    return;
  }

  const data = {
    eventName: '進路ガイダンス',
    eventDate: '2026-11-20',
    eventLocation: '視聴覚ホール',
    targetGrade: '2年生',
    details: '全体講演と3つの分科会を実施します。'
  };

  for (const [name, value] of Object.entries(data)) {
    const field = form.elements.namedItem(name);
    if (!field) continue;
    field.value = value;
    field.dispatchEvent(new Event('input', { bubbles: true }));
    field.dispatchEvent(new Event('change', { bubbles: true }));
  }
  document.getElementById('demo-status').textContent = '練習用データを入力しました。';
})();
