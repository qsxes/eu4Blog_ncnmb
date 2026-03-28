document.addEventListener('DOMContentLoaded', function() {
    // 获取所有下拉菜单项
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    dropdownItems.forEach(item => {
        item.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            if (!href.startsWith('#')) {
                return;
            }

            event.preventDefault(); // 阻止默认锚点跳转

            // 1. 获取目标锚点ID


            const targetId = href.substring(1); // 去掉 '#'
            const targetElement = document.getElementById(targetId);
            if (!targetElement) return;

            // 2. 找到目标元素所在的手风琴项
            const accordionItem = targetElement.closest('.accordion-item');
            if (!accordionItem) return;

            // 3. 展开手风琴项（如果未展开）
            const collapseElement = accordionItem.querySelector('.accordion-collapse');
            const isExpanded = collapseElement && collapseElement.classList.contains('show');

            if (!isExpanded) {
                // 模拟点击手风琴按钮，让Bootstrap自动处理展开
                const button = accordionItem.querySelector('.accordion-header button');
                if (button) {
                    button.click(); // 这会触发Bootstrap的collapse切换
                }
            }

            // 4. 高亮目标元素
            // 移除所有已存在的高亮类
            document.querySelectorAll('.highlight').forEach(el => {
                el.classList.remove('highlight');
            });
            // 为目标元素添加高亮类（也可为其父级添加，根据需求）
            targetElement.classList.add('selectTagBox');

            // 高亮一段时间后自动移除
            setTimeout(() => {
                targetElement.classList.remove('selectTagBox');
            }, 3000);

            // 5. 滚动到目标元素（需要等待展开完成）
            // 由于展开动画可能需要一点时间，延迟滚动
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 150); // 等待动画开始
        });
    });
});

//大图预览函数
// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded');
    // 获取模态框元素
    const modal = new bootstrap.Modal(document.getElementById('imagePreviewModal'));
    const modalImage = document.getElementById('previewImage');

    // 事件委托：监听整个文档的点击
    document.body.addEventListener('click', function(e) {
        console.log("触发点击")
        // 获取实际点击的元素（可能点到了图片内部的子元素，如 <a> 里的 <img>）
        let target = e.target;
        // 如果点到了图片内部的子元素，向上查找 img 标签
        if (target.tagName !== 'IMG') {
            target = target.closest('img');
        }
        if (!target) return;

        // 排除小图标，通过地址的文件夹
        if (target.src && target.src.includes('icon_imgs')) {
            return;
        } else {
            console.log(target.src);
        }

        // 获取大图地址（策略见下）
        let largeImageUrl = getLargeImageUrl(target);
        function getLargeImageUrl(imgElement) {
            return imgElement.src;
        }

        // 设置模态框图片并显示
        modalImage.src = largeImageUrl;
        modal.show();
    });
});

(function() {
    const countSpan = document.getElementById('visitCount');
    if (!countSpan) return;

    fetch('https://abacus.jasoncameron.dev/hit/eu4Blog_ncnmb/visits')
        .then(res => res.json())
        .then(data => {
            countSpan.innerText = data.value;
        })
        .catch(() => {
            countSpan.innerText = '?';
        });
})();