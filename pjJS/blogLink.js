
function buildTableOfContents() {
    // 获取所有h4,h5
    const headings = document.querySelectorAll('h4, h5');
    // 获取dl目录
    const container = document.querySelector('#offcanvasExample .offcanvas-body dl');

    // 创建
    const rootList = document.createElement('ul');
    rootList.className = 'toc-list';
    rootList.style.listStyle = 'none';
    rootList.style.paddingLeft = '0';

    let currentH4Item = null;   // 当前处理的 h4 对应的 <li> 元素
    let currentSubList = null;  // 当前 h4 下的子列表（用于放置 h5）

    headings.forEach((heading, index) => {
        // 1. 确保每个标题都有唯一 id（用于锚点）
        let headingId = heading.id;
        if (!headingId) {
            headingId = `toc-heading-${index}`;
            heading.id = headingId;
        }

        // 2. 提取标题纯文本（去除图标、标签等干扰）
        const titleText = heading.textContent.trim();

        // 3. 创建锚点链接
        const link = document.createElement('a');
        link.classList.add('blogLink')
        link.href = `#${headingId}`;
        link.textContent = titleText;
        link.style.cursor = 'pointer';
        link.style.textDecoration = 'none';
        link.style.color = '#F6B721';
        // <a className="icon-link" href="#">
        //     <i class="bi bi-link"></i>
        //     Icon link
        // </a>
        const icon = document.createElement('i')
        link.appendChild(icon)



        // 4. 根据标签类型构建层级
        const tagName = heading.tagName.toLowerCase();
        console.log("标签名", tagName, titleText);
        if (tagName === 'h4') {

            // 一级目录：创建根列表项，并重置子列表环境
            const listItem = document.createElement('li');
            listItem.appendChild(link);
            rootList.appendChild(listItem);

            currentH4Item = listItem;
            currentSubList = null; // 等待后续 h5 时动态创建子列表\

            icon.classList.add('bi','bi-card-list')

        } else if (tagName === 'h5') {
            if (currentH4Item) {
                // 当前 h5 属于最近一个 h4 的子级
                if (!currentSubList) {
                    // 动态创建子列表并添加到 h4 的列表项中
                    currentSubList = document.createElement('ul');
                    currentSubList.style.listStyle = 'none';
                    currentSubList.style.paddingLeft = '1.2rem';
                    currentSubList.style.marginTop = '0.25rem';
                    currentH4Item.appendChild(currentSubList);
                }
                const subItem = document.createElement('li');
                subItem.classList.add('blogLink')
                subItem.appendChild(link);
                currentSubList.appendChild(subItem);
                icon.classList.add('bi','bi-box')
            } else {
                // 没有前置 h4 时，将 h5 作为一级目录处理,孤儿标签说是
                const orphanItem = document.createElement('li');
                subItem.classList.add('blogLink')
                orphanItem.appendChild(link);
                rootList.appendChild(orphanItem);
                icon.classList.add('bi','bi-box')
            }
        }
    });

    // 将生成的目录追加到容器中
    container.appendChild(rootList);
}

// 页面加载完成后自动构建目录
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildTableOfContents);
}