
    document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('search');
    const keywordInput = document.getElementById('keyWordInput');

    searchBtn.addEventListener('click', function() {
    const keyword = keywordInput.value.trim().toLowerCase();

    // 获取表格主体中的所有数据行（排除表头行）
    const rows = document.querySelectorAll('tbody tr');

    if (keyword === '') {
    // 如果输入为空，恢复所有行的显示
    rows.forEach(row => {
    row.style.display = '';
});
    return;
}

    // 遍历每一行，判断是否包含关键字
    rows.forEach(row => {
    let matched = false;
    // 获取该行中所有单元格（td）
    const cells = row.querySelectorAll('td');
    for (let cell of cells) {
    const cellText = cell.textContent.trim().toLowerCase();
    if (cellText.includes(keyword)) {
    matched = true;
    break;
}
}
    // 根据匹配结果显示或隐藏行
    row.style.display = matched ? '' : 'none';
});
});
});