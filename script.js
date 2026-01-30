document.addEventListener('DOMContentLoaded', function() {
    function adjustLayout() {
        const iPhoneContainer = document.querySelector('.iPhone161');
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
    
    adjustLayout();
    window.addEventListener('resize', adjustLayout);
    
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
    
    images.forEach(img => {
        if (!img.classList.contains('frame10')) {
            img.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                modalImage.src = this.src;
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        }
        
        img.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });
    
    modalImage.addEventListener('click', function() {
        const fileName = this.src.split('/').pop().split('?')[0];
        const link = linkMap[fileName];
        if (link) {
            window.open(link, '_blank');
        }
    });
    
    closeBtn.addEventListener('click', function() {
        closeModal();
    });
    
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
    
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    const frame9 = document.querySelector('.frame9');
    if (frame9) {
        frame9.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            }
        });
    }
    
    console.log('Interactive page loaded successfully!');
});
