document.addEventListener('DOMContentLoaded', function() {
    const iPhoneContainer = document.querySelector('.iPhone161');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close');
    const images = document.querySelectorAll('.iPhone161 img');
    
    const linkMap = {
        'mkycnjzl-y9q0yhp.png': 'https://m.hbtv.com.cn/cmdetail/776160',
        'fish-head-soup.png': 'https://m.hbtv.com.cn/cmdetail/776155',
        'wangji-chicken-soup.png': 'https://m.hbtv.com.cn/cmdetail/774247',
        'pork-lotus-soup.png': 'https://m.hbtv.com.cn/cmdetail/773368',
        'yichang-fish-soup.png': 'https://m.hbtv.com.cn/cmdetail/773862',
        'yunxi-sheep-soup.png': 'https://m.hbtv.com.cn/cmdetail/774811',
        'yangxin-bird-soup.png': 'https://m.hbtv.com.cn/cmdetail/775111',
        'jingzhou-turtle-soup.png': 'https://m.hbtv.com.cn/cmdetail/775767',
        'wuchang-fish-ball.png': 'https://m.hbtv.com.cn/cmdetail/776464',
        'heshengqiao-chicken-soup.png': 'https://m.hbtv.com.cn/cmdetail/776465'
    };
    
    function adjustLayout() {
        if (!iPhoneContainer) return;
        const designWidth = 375;
        const designHeight = 813;
        const windowWidth = window.innerWidth;
        const scale = windowWidth / designWidth;
        iPhoneContainer.style.transform = `scale(${scale})`;
        iPhoneContainer.style.transformOrigin = 'top left';
        iPhoneContainer.style.position = 'absolute';
        iPhoneContainer.style.left = '0';
        iPhoneContainer.style.top = '0';
        iPhoneContainer.style.width = designWidth + 'px';
        iPhoneContainer.style.height = designHeight + 'px';
    }
    
    function openModal(img) {
        modalImage.src = img.src;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    function getFileName(url) {
        return url.split('/').pop().split('?')[0];
    }
    
    adjustLayout();
    window.addEventListener('resize', adjustLayout);
    
    images.forEach(img => {
        if (!img.classList.contains('frame10')) {
            img.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openModal(this);
            });
        }
    });
    
    modalImage.addEventListener('click', function() {
        const fileName = getFileName(this.src);
        const link = linkMap[fileName];
        if (link) {
            window.open(link, '_blank');
        }
    });
    
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
});