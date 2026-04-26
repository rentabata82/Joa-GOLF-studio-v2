/**
 * JoaGOLFStudio Main Script
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. 共通パーツの読み込み ---
    const loadCommonParts = async () => {
        const headerPlaceholder = document.getElementById('header-placeholder');
        const footerPlaceholder = document.getElementById('footer-placeholder');

        // ヘッダー読み込み
        if (headerPlaceholder) {
            try {
                // ファイルパスはプロジェクトのルート基準
                const response = await fetch('/common/header.html');
                const html = await response.text();
                headerPlaceholder.innerHTML = html;

                // ヘッダー読み込み完了後にハンバーガーメニュー機能を有効化
                initHamburger();
            } catch (err) {
                console.error("Header load failed:", err);
            }
        }

        // フッター読み込み
        if (footerPlaceholder) {
            try {
                const response = await fetch('/common/footer.html');
                const html = await response.text();
                footerPlaceholder.innerHTML = html;
            } catch (err) {
                console.error("Footer load failed:", err);
            }
        }
    };

    // --- 2. ハンバーガーメニューの制御 ---
    const initHamburger = () => {
        const btn = document.getElementById('js-hamburger');
        const nav = document.querySelector('.pc-nav');

        if (btn && nav) {
            btn.addEventListener('click', () => {
                btn.classList.toggle('is-active');
                nav.classList.toggle('is-show');
            });
        }
    };

    // --- 3. スクロールアニメーション (Intersection Observer) ---
    const initScrollAnimation = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });

        const targets = document.querySelectorAll('.fade-in');
        targets.forEach(target => observer.observe(target));
    };

    // --- 実行 ---
    loadCommonParts().then(() => {
        // 全パーツ読み込み後にアニメーションなどを初期化
        initScrollAnimation();
    });

    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const offset = 80; // ヘッダーの高さ分
                const bodyRect = document.body.getBoundingClientRect().top;
                const targetRect = target.getBoundingClientRect().top;
                const targetPosition = targetRect - bodyRect - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
